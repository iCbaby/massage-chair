/**
 * @description 拿钉钉token
 * @author 飞翔
 */

const axios = require('axios').default
const { DING_APP_KEY, DING_APP_SECRET } = require('../config/dingConf')
const url = `https://oapi.dingtalk.com/gettoken?appkey=${DING_APP_KEY}&appsecret=${DING_APP_SECRET}`
let token = ''
let getTokenTime = 0
let expiresIn = 7200

/**
 * 拿钉钉token
 */
async function getDingToken () {
  if (new Date().getTime() > getTokenTime + 1000 * expiresIn) {
    const { data } = await axios.get(url)
    getTokenTime = new Date().getTime()
    if (expiresIn !== data.expires_in) expiresIn = data.expires_in
    token = data.access_token
  }
  return token
}

module.exports = {
  getDingToken
}
