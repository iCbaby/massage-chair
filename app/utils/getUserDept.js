/**
 * @description 拿用户部门信息
 * @author 飞翔
 */

const axios = require('axios').default
const { getUserDeptUrl } = require('../apis/dingDing')

/**
 * 拿用户部门信息
 * @param {String} userId 枚举的参数
 */
async function getUserDept (deptId) {
  const url = await getUserDeptUrl(deptId)
  const { data } = await axios.get(url)
  return data
}

module.exports = {
  getUserDept
}
