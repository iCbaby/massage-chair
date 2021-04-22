/**
 * @description order controller 2020双十一
 * @author iC
 */

const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const mongoose = require('mongoose')
// const axios = require('axios').default
const { create, find } = require('../services/orders')
const { find: findFloor, findOneAndUpdate: findOneAndUpdateFloor } = require('../services/floors')
const { requiredValidator } = require('../utils/requiredValidator')
const { ONE_DAY_ONE_TIME, ONE_WEEK_TWO_TIMES, NO_COUNT } = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')

dayjs.extend(weekOfYear)

class OrdersCtl {
  /**
   * 查order
   * @param {Object} ctx 上下文
   */
  async findOrders (ctx) {
    const orders = await find(ctx.request.body)
    ctx.body = orders
  }

  /**
   * 预约
   * @param {Object} ctx 上下文
   */
  async reserve (ctx, next) {
    // 校验参数
    requiredValidator(['user', 'userid', 'date', 'floorName', 'location', 'timing'], ctx)

    // 惩罚(后面再补充)

    // 判断今日预约过未
    const { userid, date } = ctx.request.body
    const todayOrders = await find({ userid, date })
    if (todayOrders.length) ctx.throw(403, ONE_DAY_ONE_TIME)

    // 判断这周预约是否超过两单
    const dayOfWeek = dayjs(date).week()
    const weekOrders = await find({ userid, dayOfWeek })
    if (weekOrders.length >= 2) ctx.throw(403, ONE_WEEK_TWO_TIMES)

    // 事务
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // 该时间段是否有剩余
      const { floorName, timing } = ctx.request.body
      const floorList = await findFloor({ floorName }, date)
      const targetFloor = floorList[0]
      const targetReservation = targetFloor.reservation[date].find(item => item.timing === timing)
      if (targetReservation.count <= 0) ctx.throw(403, NO_COUNT)

      // 在floor reservation中减去对应日期的count
      targetReservation.count--
      const newReservation = copyObj(targetFloor.reservation)
      targetFloor.reservation = newReservation

      targetFloor.markModified(`reservation[${date}]`)
      await targetFloor.save()

      // 创建预约订单
      const params = copyObj(ctx.request.body)
      params.dayOfWeek = dayOfWeek
      params.status = 1
      await create(params)
    })
    session.endSession()

    ctx.status = 204
    await next()
  }

  // /**
  //  * 发钉钉消息
  //  * @param {Object} ctx 上下文
  //  */
  // async sendCorpconversation (ctx) {
  //   const { toUserId, fromUserName } = ctx.request.body
  //   const url = await getCorpconversationUrl()
  //   await axios.post(url, {
  //     agent_id: AGENT_ID,
  //     userid_list: toUserId,
  //     msg: {
  //       msgtype: 'oa',
  //       oa: {
  //         message_url: 'eapp://pages/sendCard/sendCard',
  //         head: {
  //           bgcolor: 'FFBBBBBB',
  //           text: '头部标题'
  //         },
  //         body: {
  //           title: `${fromUserName}发给你一张双十一感谢卡`,
  //           form: [
  //             {
  //               key: '发送人：',
  //               value: fromUserName
  //             },
  //             {
  //               key: '发送时间：',
  //               value: dayjs().format('YYYY-MM-DD HH:mm:ss')
  //             }
  //           ],
  //           content: '请点击进入小程序查看',
  //           image: '@lADPDfYHwzcybfXNA-jNBuo',
  //           author: fromUserName
  //         }
  //       }
  //     }
  //   })
  // }
}

module.exports = new OrdersCtl()
