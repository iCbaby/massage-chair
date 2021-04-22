/**
 * @description floor controller
 * @author iC
 */

const { find } = require('../services/floors')
const { getTime } = require('../utils/getTime')
const { NEED_SCHEMA_PARAMS } = require('../errors/common')

class FloorsCtl {
  /**
   * 查今日日期
   * @param {Object} ctx 上下文
   */
  async findFloors (ctx) {
    const { date = null, location = null } = ctx.query
    if (!date) ctx.throw(412, `${NEED_SCHEMA_PARAMS}: date`)
    if (!location) ctx.throw(412, `${NEED_SCHEMA_PARAMS}: location`)

    const currentTime = getTime()
    const query = { location }

    const floors = await find(query, date)
    ctx.body = {
      currentTime,
      floors
    }
  }
}

module.exports = new FloorsCtl()
