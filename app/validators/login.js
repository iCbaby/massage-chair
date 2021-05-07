/**
 * @description login 数据格式校验
 * @author 飞翔
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    authCode: {
      type: 'string'
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function orderValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = orderValidate
