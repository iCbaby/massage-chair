/**
 * @description user controller
 * @author iC
 */

const { getUserInfo } = require('../utils/getUserInfo')

class UsersCtrl {
  /**
   * 查找user
   * @param {Object} ctx 上下文
   */
  async getDingUserInfo (ctx) {
    const { id } = ctx.params
    const user = await getUserInfo(id)
    ctx.body = user
  }
}

module.exports = new UsersCtrl()
