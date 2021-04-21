/**
 * @description greeting-card 数据格式校验
 * @author iC
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    cardType: {
      type: 'string'
    },
    remark: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    fromUserId: {
      type: 'string'
    },
    toUserId: {
      type: 'string'
    },
    fromUserName: {
      type: 'string'
    },
    toUserName: {
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
