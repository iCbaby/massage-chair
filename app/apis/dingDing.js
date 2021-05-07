/**
 * @description api url
 * @author 飞翔
 */

const { getDingToken } = require('../utils/getDingToken')

/**
 * 钉钉 拿userInfo url
 * @param {Object} 参数对象
 */
async function getUserIdUrl (authCode) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/user/getuserinfo?access_token=${token}&code=${authCode}`
}

/**
 * 钉钉 拿userInfo url
 * @param {Object} 参数对象
 */
async function getUserInfoUrl (userId) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/user/get?access_token=${token}&userid=${userId}`
}

/**
 * 钉钉 拿用户部门信息 url
 * @param {Object} 参数对象
 */
async function getUserDeptUrl (deptId) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/department/get?access_token=${token}&id=${deptId}`
}

/**
 * 钉钉 推送工作消息
 * @param {Object} 参数对象
 */
async function getCorpconversationUrl () {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`
}

/**
 * 钉钉 上传图片
 * @param {Object} 参数对象
 */
async function getUploadUrl (type) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/media/upload?access_token=${token}&type=${type}`
}

module.exports = {
  getUserIdUrl,
  getUserInfoUrl,
  getUserDeptUrl,
  getCorpconversationUrl,
  getUploadUrl
}
