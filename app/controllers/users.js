/**
 * @description user controller
 * @author 飞翔
 */

const { getUserInfo } = require('../utils/getUserInfo')
const { find } = require('../services/users')

class UsersCtrl {
  /**
   * 查找ding user
   * @param {Object} ctx 上下文
   */
  async getDingUserInfo (ctx) {
    const { id } = ctx.params
    const user = await getUserInfo(id)
    ctx.body = user
  }

  /**
   * 查找user
   * @param {Object} ctx 上下文
   */
  async getUserInfo (ctx) {
    const { id } = ctx.params
    const user = await find({ userid: id })
    ctx.body = user
  }
}

module.exports = new UsersCtrl()
