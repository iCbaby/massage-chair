/**
 * @description user service
 * @author iC
 */

const UserModel = require('../models/users')

class UsersServ {
  /**
   * 创建用户
   * @param {Object} params 参数
   */
  async create (params) {
    const user = await new UserModel(params).save()
    return user
  }

  /**
   * 查找用户列表
   * @param {Object} params 参数
   */
  async find (params) {
    const users = await UserModel.find(params)
    return users
  }

  /**
   * 查找用户
   * @param {String} id id
   */
  async findById (id) {
    const user = await UserModel.findById(id)
    return user
  }
}

module.exports = new UsersServ()
