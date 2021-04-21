/**
 * @description json schema 验证中间件
 * @author iC
 */

const { SCHEMA_FAILED } = require('../errors/common')

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator (validateFn) {
  // 定义中间件函数
  async function validator (ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) checkError(error, ctx)
    // 验证成功，继续
    await next()
  }
  // 返回中间件
  return validator
}

/**
 * 检查错误类型
 * @param {Object} error 错误信息对象
 * @param {Object} ctx 上下文
 */
function checkError (error, ctx) {
  if (error) console.error(error)

  switch (error.keyword) {
    case 'required':
      ctx.throw(412, `${SCHEMA_FAILED}: '${error.message}`)
      break
    case 'enum':
      ctx.throw(
        412,
        `${SCHEMA_FAILED}: '${error.dataPath.slice(
          1
        )}' 必须符合 ${error.params.allowedValues.toString()} 中的一项`
      )
      break
    case 'minLength':
      ctx.throw(
        412,
        `${SCHEMA_FAILED}: '${error.dataPath.slice(1)}' 规定最少长度为 ${error.params.limit}`
      )
      break
    case 'maxLength':
      ctx.throw(
        412,
        `${SCHEMA_FAILED}: '${error.dataPath.slice(1)}' 规定最大长度为 ${error.params.limit}`
      )
      break
    case 'type':
      ctx.throw(
        412,
        `${SCHEMA_FAILED}: '${error.dataPath.slice(1)}' 类型要求为 ${error.params.type}`
      )
      break
    default:
      ctx.throw(412, SCHEMA_FAILED)
      break
  }
}

module.exports = {
  genValidator
}
