/**
 * @description order controller 2020双十一
 * @author iC
 */

const dayjs = require('dayjs')
const { create, find, universalFind, findById, update, countAll } = require('../services/orders')
const { requiredValidator } = require('../utils/requiredValidator')
const { enumValidator } = require('../utils/enumValidator')
const {
  CANT_SEND_TO_MYSELF,
  CARD_TYPE_ERROR,
  CANT_FIND_FROMUSER,
  CANT_FIND_TOUSER
} = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')
const { formatPagination } = require('../utils/pagination')
const { getUserInfo } = require('../utils/getUserInfo')
const { getUserDept } = require('../utils/getUserDept')
const axios = require('axios').default
const { getCorpconversationUrl } = require('../apis/dingDing')
const { AGENT_ID } = require('../config/dingConf')

class OrdersCtl {
  /**
   * 查order
   * @param {Object} ctx 上下文
   */
  async findCards (ctx) {
    const orders = await find()
    ctx.body = orders
  }

  /**
   * 发卡人fromUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByFromUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    // 拿订单
    const [orders, count] = await Promise.all([
      find({ fromUserId: id, perPage, page }),
      countAll({ fromUserId: id })
    ])

    // // 拿收卡用户信息
    // const infoAjaxList = orders.map(item => getUserInfo(item.toUserId))
    // const infoList = await Promise.all(infoAjaxList)

    // // 合并
    // const newOrders = orders.map((item, index) => {
    //   if (infoList[index] && !infoList[index].name) {
    //     ctx.throw(412, '这张' + CANT_FIND_TOUSER + ': ' + orders[index]._id)
    //   }
    //   item._doc.toUserName = infoList[index].name
    //   return item
    // })

    ctx.body = {
      data: orders,
      count
    }
  }

  /**
   * 收卡人toUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByToUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    // 拿订单
    const [orders, count] = await Promise.all([
      find({ toUserId: id, perPage, page }),
      countAll({ toUserId: id })
    ])

    // // 拿发卡用户信息
    // const infoAjaxList = orders.map(item => getUserInfo(item.fromUserId))
    // const infoList = await Promise.all(infoAjaxList)

    // // 合并
    // const newOrders = orders.map((item, index) => {
    //   if (infoList[index] && !infoList[index].name) {
    //     ctx.throw(412, '这张' + CANT_FIND_FROMUSER + ': ' + orders[index]._id)
    //   }
    //   item._doc.fromUserName = infoList[index].name
    //   return item
    // })

    ctx.body = {
      data: orders,
      count
    }
  }

  /**
   * 订单详情
   * @param {Object} ctx 上下文
   */
  async cardDetail (ctx) {
    const order = await findById(ctx.params.id)

    // // 拿用户信息
    // const { fromUserId, toUserId } = order
    // const [fromUser, toUser] = await Promise.all([getUserInfo(fromUserId), getUserInfo(toUserId)])
    // if (fromUser.errcode !== 0) ctx.throw(412, CANT_FIND_FROMUSER)
    // if (toUser.errcode !== 0) ctx.throw(412, CANT_FIND_TOUSER)

    // // 拿用户部门
    // const [fromUserDept, toUserDept] = await Promise.all([
    //   getUserDept(fromUser.department[0]),
    //   getUserDept(toUser.department[0])
    // ])

    // // 合并
    // order._doc.fromUserDept = fromUserDept.name
    // order._doc.toUserDept = toUserDept.name
    // order._doc.fromUserName = fromUser.name
    // order._doc.toUserName = toUser.name

    ctx.body = {
      data: order
    }
  }

  /**
   * 发卡
   * @param {Object} ctx 上下文
   */
  async sendCard (ctx, next) {
    // 校验参数
    requiredValidator(['cardType', 'fromUserId', 'toUserId', 'remark'], ctx)

    // 校验发卡人和收卡人
    const { fromUserId, toUserId } = ctx.request.body
    if (fromUserId === toUserId) ctx.throw(412, CANT_SEND_TO_MYSELF)
    const [fromUser, toUser] = await Promise.all([getUserInfo(fromUserId), getUserInfo(toUserId)])
    if (fromUser.errcode !== 0) ctx.throw(412, CANT_FIND_FROMUSER)
    if (toUser.errcode !== 0) ctx.throw(412, CANT_FIND_TOUSER)

    // 校验cardType enum
    const { cardType } = ctx.request.body
    enumValidator(cardType, ['玩', '美', '赢', '家'], ctx, CARD_TYPE_ERROR)

    // 设置姓名电话
    const setData = copyObj(ctx.request.body)
    setData.fromUserName = fromUser.name
    setData.toUserName = toUser.name
    setData.fromUserMobile = fromUser.mobile
    setData.toUserMobile = toUser.mobile

    // 设置部门
    const [fromUserDept, toUserDept] = await Promise.all([
      getUserDept(fromUser.department[0]),
      getUserDept(toUser.department[0])
    ])
    setData.fromUserDept = fromUserDept.name
    setData.toUserDept = toUserDept.name

    create(setData)
    ctx.status = 204
    await next()
  }

  /**
   * 查看是否有卡未读
   * @param {Object} ctx 上下文
   */
  async haveUnreadCard (ctx) {
    const { id } = ctx.params
    const params = { toUserId: id, isRead: false }
    const card = await universalFind(params, null)
    ctx.body = card.length > 0
  }

  /**
   * 标记卡已读
   * @param {Object} ctx 上下文
   */
  async readCard (ctx) {
    const { id } = ctx.params
    const setData = { $set: { isRead: true } }
    update(id, setData)
    ctx.status = 204
  }

  /**
   * 发钉钉消息
   * @param {Object} ctx 上下文
   */
  async sendCorpconversation (ctx) {
    const { toUserId, fromUserName } = ctx.request.body
    const url = await getCorpconversationUrl()
    await axios.post(url, {
      agent_id: AGENT_ID,
      userid_list: toUserId,
      msg: {
        msgtype: 'oa',
        oa: {
          message_url: 'eapp://pages/sendCard/sendCard',
          head: {
            bgcolor: 'FFBBBBBB',
            text: '头部标题'
          },
          body: {
            title: `${fromUserName}发给你一张双十一感谢卡`,
            form: [
              {
                key: '发送人：',
                value: fromUserName
              },
              {
                key: '发送时间：',
                value: dayjs().format('YYYY-MM-DD HH:mm:ss')
              }
            ],
            content: '请点击进入小程序查看',
            image: '@lADPDfYHwzcybfXNA-jNBuo',
            author: fromUserName
          }
        }
      }
    })
  }
}

module.exports = new OrdersCtl()
