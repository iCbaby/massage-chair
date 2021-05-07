/**
 * @description reservation service
 * @author 飞翔
 */

const ReservationModel = require('../models/reservations')

class ReservationsServ {
  /**
   * 查找某日某地点的楼层信息
   * @param {Object} params 查询条件
   */
  async find (params = {}, date) {
    const reservations = await ReservationModel.find(params).sort({ _id: 1 })
    return reservations
  }

  /**
   * 修改预约时间段信息
   * @param {Object} params 查询条件
   */
  async findOneAndUpdate (params = {}, modeify = {}) {
    const reservation = await ReservationModel.findOneAndUpdate(params, modeify, { new: true })
    return reservation
  }
}

module.exports = new ReservationsServ()
