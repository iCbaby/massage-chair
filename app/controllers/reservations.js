/**
 * @description reservation controller
 * @author 飞翔
 */

const { find } = require('../services/reservations')
const { getTime } = require('../utils/getTime')
const { NEED_SCHEMA_PARAMS } = require('../errors/common')

class ReservationsCtl {
  /**
   * 查今日日期
   * @param {Object} ctx 上下文
   */
  async findReservations (ctx) {
    const { date = null, floorName = null } = ctx.query
    if (!date) ctx.throw(412, `${NEED_SCHEMA_PARAMS}: date`)
    if (!floorName) ctx.throw(412, `${NEED_SCHEMA_PARAMS}: floorName`)

    const currentTime = getTime() // 模拟获取预约的时间
    const currentStamp = new Date().getTime() // 模拟获取预约的时间
    const query = {
      date,
      floorName,
      startTimeStamp: {
        $gt: currentStamp + 300000
      }
    }

    const reservations = await find(query)
    ctx.body = {
      currentTime,
      reservations,
      msg: 'ok'
    }
  }
}

module.exports = new ReservationsCtl()
