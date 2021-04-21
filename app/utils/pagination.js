/**
 * @description 分页
 * @author iC
 */

const { checkType } = require('./checkType')

/**
 * 格式化分页参数
 * @param {Object} params 需要深复制的对象
 */
function formatPagination (params) {
  if (!params.perPage) {
    params.perPage = 10
  } else if (params.perPage && checkType(params.perPage) !== 'number') {
    params.perPage = params.perPage * 1
  }

  if (!params.page) {
    params.page = 0
  } else if (params.page && checkType(params.page) !== 'number') {
    params.page = params.page * 1
  }

  return params
}

module.exports = {
  formatPagination
}
