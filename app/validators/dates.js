/**
 * @description greeting-card 数据格式校验
 * @author iC
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    date: {
      type: 'string'
    },
    dateStrartTime: {
      type: 'string'
    },
    dateEndTime: {
      type: 'string'
    },
    isMassageDate: {
      type: 'boolean'
    },
    canChooseDate: {
      type: 'array'
    },
    dayOfWeek: {
      type: 'number'
    },
    week: {
      type: 'number'
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
