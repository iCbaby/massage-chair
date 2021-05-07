/**
 * @description 判断类型
 * @author 飞翔
 */

/**
 * 判断类型
 * @param {Any} o 需要判断的参数
 */
function checkType (o) {
  let type = ''
  switch (Object.prototype.toString.call(o)) {
    case '[object Object]':
      type = 'object'
      break
    case '[object Array]':
      type = 'array'
      break
    case '[object Function]':
      type = 'function'
      break
    case '[object RegExp]':
      type = 'regExp'
      break
    case '[object Date]':
      type = 'date'
      break
    case '[object Error]':
      type = 'error'
      break
    case '[object Number]':
      type = 'number'
      break
    case '[object String]':
      type = 'string'
      break
    case '[object Boolean]':
      type = 'boolean'
      break
    case '[object Undefined]':
      type = 'undefined'
      break
    case '[object Null]':
      type = 'null'
      break
    case '[object Set]':
      type = 'set'
      break
    case '[object Map]':
      type = 'map'
      break
    case '[object WeakSet]':
      type = 'weakSet'
      break
    case '[object WeakMap]':
      type = 'weakMap'
      break
    case '[object Symbol]':
      type = 'symbol'
      break
    case '[object BigInt]':
      type = 'bigInt'
      break
    default:
      break
  }
  return type
}

module.exports = {
  checkType
}
