/**
 * @description date controller
 * @author iC
 */

const { find } = require('../services/dates')
const { getTime } = require('../utils/getTime')

class DatesCtl {
  /**
   * 查今日日期
   * @param {Object} ctx 上下文
   */
  async findDates (ctx) {
    try {
      const currentTime = getTime('2021-05-21')
      const query = {
        date: currentTime.split(' ')[0]
      }
      const dates = await find(query)
      ctx.body = {
        currentTime,
        dates
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new DatesCtl()
