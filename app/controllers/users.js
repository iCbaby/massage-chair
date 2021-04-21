/**
 * @description user controller
 * @author iC
 */

const { getUserInfo } = require('../utils/getUserInfo')
const { getUserDept } = require('../utils/getUserDept')

class UsersCtrl {
  /**
   * 查找user
   * @param {Object} ctx 上下文
   */
  async getDingUserInfo (ctx) {
    const { id } = ctx.params
    const user = await getUserInfo(id)
    const dept = await getUserDept(user.department[0])
    user.department = dept.name
    ctx.body = user
  }
}

module.exports = new UsersCtrl()
