/**
 * @description logger 中间件
 * @author iC
 */

const log4js = require('log4js')
const { loggerConfig } = require('../config/loggerConf')

log4js.configure(loggerConfig)
const httpLogger = log4js.getLogger('httpLogger')
const errorLogger = log4js.getLogger('errorLogger')

/**
 *
 * @param {Object} ctx 上下文
 * @param {Function} next 向下执行函数
 */
async function icLogger (ctx, next) {
  try {
    await next()
    httpLogger.info(
      `URL: ${ctx.url}, METHOD: ${ctx.method}, CTX_STATE: ${JSON.stringify(
        ctx.state
      )}, POST_DATA: ${JSON.stringify(ctx.request.body)}, USER_AGENT: ${ctx.header['user-agent']}`
    )
  } catch (error) {
    errorLogger.error(
      `ERR_MSG: ${JSON.stringify(error)}, URL: ${ctx.url}, METHOD: ${
        ctx.method
      }, CTX_STATE: ${JSON.stringify(ctx.state)}, POST_DATA: ${JSON.stringify(
        ctx.request.body
      )}, USER_AGENT: ${ctx.header['user-agent']}`
    )
    console.error(error)
    ctx.throw(error)
  }
}

module.exports = { icLogger }
