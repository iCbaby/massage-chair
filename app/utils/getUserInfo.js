/**
 * @description 拿用户信息
 * @author 飞翔
 */

const axios = require('axios').default
const { getUserInfoUrl } = require('../apis/dingDing')

/**
 * 拿用户信息
 * @param {String} userId 枚举的参数
 */
async function getUserInfo (userId) {
  const url = await getUserInfoUrl(userId)
  const { data } = await axios.get(url)
  return data
}

module.exports = {
  getUserInfo
}
