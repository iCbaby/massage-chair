/**
 * @description 深复制
 * @author 飞翔
 */

const { checkType } = require('./checkType')

/**
 * 深复制Object
 * @param {Object} obj 需要深复制的对象
 */
function copyObj (obj) {
  if (checkType(obj) === 'object' || checkType(obj) === 'array') {
    return JSON.parse(JSON.stringify(obj))
  } else {
    return false
  }
}

module.exports = {
  copyObj
}
