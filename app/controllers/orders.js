/**
 * @description order controller 2020双十一
 * @author iC
 */

const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const mongoose = require('mongoose')
const { getTime } = require('../utils/getTime')
// const axios = require('axios').default
const { create, find, findById } = require('../services/orders')
const {
  find: findReservations,
  findOneAndUpdate: findOneAndUpdateReservation
} = require('../services/reservations')
const { requiredValidator } = require('../utils/requiredValidator')
const { ONE_DAY_ONE_TIME, ONE_WEEK_TWO_TIMES, NO_COUNT, CANT_CANCEL } = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')

dayjs.extend(weekOfYear)

class OrdersCtl {
  /**
   * 查order
   * @param {Object} ctx 上下文
   */
  async findOrders (ctx) {
    const { userid } = ctx.query
    const orders = await find({ userid })
    const currentTime = getTime()

    ctx.body = {
      currentTime,
      orders,
      msg: 'ok'
    }
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

    // 该时间段是否有剩余
    const { floorName, timing } = ctx.request.body
    const targetReservations = await findReservations({
      floorName,
      timing,
      date,
      count: { $gt: 0 }
    })
    if (!targetReservations.length) ctx.throw(403, NO_COUNT)

    // 事务
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // 在floor reservation中减去对应日期的count
      targetReservations[0].count--

      // 创建预约订单
      const params = copyObj(ctx.request.body)
      params.dayOfWeek = dayOfWeek
      params.status = 1

      // 执行
      await Promise.all([targetReservations[0].save(), create(params)])

      ctx.status = 204
    })
    session.endSession()
    await next()
  }

  /**
   * 取消预约
   * @param {Object} ctx 上下文
   */
  async cancelReserve (ctx, next) {
    // 是否符合取消条件
    const currentTime = new Date().getTime()
    const { id } = ctx.params
    const order = await findById(id)
    const startTimeStr = `${order.date} ${order.timing.split('-')[0]}:00`
    const startTime = new Date(startTimeStr).getTime()
    const less1 = startTime - currentTime < 60000 // 现在距离预约时间是否少于1小时
    if (less1) ctx.throw(403, CANT_CANCEL)

    // 取消
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // 修改订单状态 + 释放时间段
      order.status = 0
      const { floorName, timing, date } = order
      await Promise.all([
        order.save(),
        findOneAndUpdateReservation({ floorName, timing, date }, { $inc: { count: 1 } })
      ])

      ctx.status = 204
    })
    session.endSession()
    // 60823f29c9449622c4a4e1a8
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
