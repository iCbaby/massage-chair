/**
 * @description order service
 * @author iC
 */

const OrderModel = require('../models/orders')

class OrdersServ {
  /**
   * 新建订单
   * @param {Object} userInfo 用户信息
   */
  async create (params) {
    const order = await new OrderModel(params).save()
    return order
  }

  /**
   * 查找订单列表
   * @param {Object} params 查询条件
   */
  async find (params = {}) {
    const orders = await OrderModel.find(params).sort({ _id: -1 })
    return orders
  }

  /**
   * 查找订单
   * @param {Object} params 查询条件
   */
  async findById (id) {
    const order = await OrderModel.findById(id)
    return order
  }

  /**
   * 修改多个订单
   * @param {Object} params 查询条件
   * @param {Object} update 修改条件
   */
  async updateMany (params, modeify) {
    const orders = await OrderModel.updateMany(params, modeify)
    return orders
  }
}

module.exports = new OrdersServ()
