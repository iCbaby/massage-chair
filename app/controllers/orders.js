/**
 * @description order controller
 * @author iC
 */

const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const mongoose = require('mongoose')
const { getTime } = require('../utils/getTime')
const { sendCorpconversation } = require('../utils/sendCorpconversation')
const { create, find, findById } = require('../services/orders')
const { find: findUser } = require('../services/users')
const {
  find: findReservations,
  findOneAndUpdate: findOneAndUpdateReservation
} = require('../services/reservations')
const { requiredValidator } = require('../utils/requiredValidator')
const {
  ONE_DAY_ONE_TIME,
  ONE_WEEK_TWO_TIMES,
  NO_COUNT,
  CANT_CANCEL,
  BAN_ORDER
} = require('../errors/orders')
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
    const { userid, date } = ctx.request.body
    const dayOfWeek = dayjs(date).week()
    const banUser = await findUser({ userid, banWeek: dayOfWeek })
    if (banUser.length) ctx.throw(403, BAN_ORDER)

    // 判断今日预约过未
    const status = 1
    const todayOrders = await find({ userid, date, status })
    if (todayOrders.length) ctx.throw(403, ONE_DAY_ONE_TIME)

    // 判断这周预约是否超过两单
    const weekOrders = await find({ userid, dayOfWeek, status })
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
      params.dingOneHour = false
      params.dingHalfHour = false
      params.startTimeStamp = new Date(`${date} ${timing.split('-')[0]}:00`).getTime()

      // 执行
      const [newoOder] = await Promise.all([create(params), targetReservations[0].save()])

      ctx.status = 204
      ctx.state.order = newoOder

      await next()
    })
    session.endSession()
  }

  /**
   * 取消预约
   * @param {Object} ctx 上下文
   */
  async cancelReserve (ctx, next) {
    // 是否符合取消条件
    const currentTimeStamp = new Date().getTime()
    const { id } = ctx.params
    const order = await findById(id)
    const { startTimeStamp } = order
    const diff = startTimeStamp - currentTimeStamp < 3600000 // 现在距离预约时间是否少于1小时
    if (diff) ctx.throw(403, CANT_CANCEL)

    // 取消
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // 修改订单状态 + 释放时间段
      order.status = 0
      const { floorName, timing, date } = order
      const [newOrder] = await Promise.all([
        order.save(),
        findOneAndUpdateReservation({ floorName, timing, date }, { $inc: { count: 1 } })
      ])
      ctx.state.order = newOrder

      ctx.status = 204
    })
    session.endSession()
  }

  /**
   * 设置ding
   * @param {Object} ctx 上下文
   */
  async setDing (ctx) {
    // 立刻ding对方
    sendCorpconversation(ctx.state.order)
  }
}

module.exports = new OrdersCtl()
