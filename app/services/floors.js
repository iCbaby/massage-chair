/**
 * @description floor service
 * @author 飞翔
 */

const FloorModel = require('../models/floors')

class FloorsServ {
  /**
   * 查找某日某地点的楼层信息
   * @param {Object} params 查询条件
   */
  async find (params = {}, date) {
    const floors = await FloorModel.find(params).sort({ _id: 1 })
    return floors
  }

  // /**
  //  * 修改楼层信息
  //  * @param {Object} params 查询条件
  //  */
  // async findOneAndUpdate (params = {}, modeify = {}) {
  //   const floors = await FloorModel.findOneAndUpdate(params, modeify, { new: true })
  //   return floors
  // }
}

module.exports = new FloorsServ()
