/**
 * @description order service 2020双十一
 * @author iC
 */

const Order = require('../models/orders')

class OrdersServ {
  /**
   * 新建订单
   * @param {Object} userInfo 用户信息
   */
  async create (params) {
    const order = await new Order(params).save()
    return order
  }

  /**
   * 查找订单列表
   * @param {Object} params 查询条件
   */
  async find (params = {}) {
    const { fromUserId, toUserId, perPage, page } = params
    const query = {}
    if (fromUserId) query.fromUserId = fromUserId
    if (toUserId) query.toUserId = toUserId

    const orders = await Order.find(query)
      .limit(perPage)
      .skip(page * perPage)
      .sort({ _id: -1 })
    return orders
  }

  /**
   * 通用查找订单列表
   * @param {Object} params 查询条件
   * @param {Object} projection mongoose projection。很少用，不用管
   * @param {Object} options 查询选项
   */
  async universalFind (params = {}, projection, options) {
    const orders = await Order.find(params, projection, options)
    return orders
  }

  /**
   * 查找特定订单
   * @param {Object} params 查询条件
   */
  async findById (id) {
    const order = await Order.findById(id)
    return order
  }

  /**
   * 更新订单
   * @param {String} id 订单id
   * @param {Object} params 查询参数
   */
  async update (id, params) {
    const order = await Order.findByIdAndUpdate(id, params, { new: true })
    return order
  }

  /**
   * 计算总数
   * @param {Object} params 查询参数
   */
  async countAll (params) {
    const count = await Order.countDocuments(params)
    return count
  }
}

module.exports = new OrdersServ()
