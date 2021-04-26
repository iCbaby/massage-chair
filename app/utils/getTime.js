/**
 * @description 获取现在的日期时间
 * @author iC
 */

const dayjs = require('dayjs')

/**
 * 获取现在的日期时间
 * @param {String} date 自定义日期
 * @param {String} format 格式化
 */
function getTime (date = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

module.exports = { getTime }
