/**
 * @description login controller
 * @author iC
 */

const axios = require('axios').default
const { getUserIdUrl } = require('../apis/dingDing')
// const { create } = require('../services/users')

class LoginCtrl {
  /**
   * 登录
   * @param {Object} ctx 上下文
   */
  async login (ctx) {
    const { authCode } = ctx.request.body
    const url = await getUserIdUrl(authCode)
    const { data } = await axios.get(url)
    ctx.body = data
  }
}

module.exports = new LoginCtrl()
