/**
 * @description date controller
 * @author 飞翔
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
      const currentTime = getTime('2021-05-21 12:00:00') // 控制模拟请求日期
      const query = {
        date: currentTime.split(' ')[0]
      }
      const dates = await find(query)
      ctx.body = {
        currentTime,
        dates,
        msg: 'ok'
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new DatesCtl()
