/**
 * @description date service
 * @author 飞翔
 */

const DateModel = require('../models/dates')

class DatesServ {
  /**
   * 查找订单列表
   * @param {Object} params 查询条件
   */
  async find (params = {}) {
    const dates = await DateModel.find(params)
    return dates
  }
}

module.exports = new DatesServ()
