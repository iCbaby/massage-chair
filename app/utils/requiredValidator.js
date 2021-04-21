/**
 * @description 校验必须参数
 * @author iC
 */

const { checkType } = require('./checkType')
const { NEED_SCHEMA_PARAMS, NEED_ONE_OF_PARAMS } = require('../errors/common')

/**
 * 校验必须的参数
 * @param {String|Array} keys 必须参数的key
 * @param {Object} ctx 上下文
 */
function requiredValidator (keys, ctx) {
  const type = checkType(keys)
  if (type === 'array') {
    keys.forEach(item => {
      const subType = checkType(item)
      if (subType === 'array') {
        let requiredFlag = false
        for (let i = 0; i < item.length; i++) {
          if (ctx.request.body[item[i]]) {
            requiredFlag = true
            break
          }
        }
        if (!requiredFlag) ctx.throw(412, `${NEED_ONE_OF_PARAMS}: ${item.toString()}`)
      } else if (subType === 'string' && !ctx.request.body[item]) {
        ctx.throw(412, `${NEED_SCHEMA_PARAMS}: ${item}`)
      }
    })
  } else if (type === 'string' && !ctx.request.body[keys]) {
    ctx.throw(412, `${NEED_SCHEMA_PARAMS}: ${keys}`)
  }
}

module.exports = {
  requiredValidator
}
