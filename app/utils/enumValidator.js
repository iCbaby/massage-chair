/**
 * @description 校验enum参数
 * @author 飞翔
 */

const { checkType } = require('./checkType')
const { TYPE_NEED_ARRAY } = require('../errors/common')

/**
 * 校验enum参数
 * @param {String|Number|Boolean} key 校验的参数
 * @param {Array} enumList 枚举的参数
 * @param {Object} ctx 上下文
 */
function enumValidator (key, enumList, ctx, errorMsg, errorNo = 412) {
  if (checkType(enumList) !== 'array') ctx.throw(500, `枚举校验器第二个参数的${TYPE_NEED_ARRAY}`)
  const flag = enumList.find(item => item === key)
  if (!flag) ctx.throw(errorNo, errorMsg)
}

module.exports = {
  enumValidator
}
