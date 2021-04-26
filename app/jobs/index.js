/**
 * @description schedule
 * @author iC
 */

const cron = require('node-cron')
const { find, updateMany } = require('../services/orders')
const { sendCorpconversation } = require('../utils/sendCorpconversation')

async function ordersSchedule () {
  cron.schedule('*/1 * * * *', async () => {
    // 找订单
    const currentStamp = new Date().getTime()
    const queryOneHour = {
      startTimeStamp: {
        $gte: currentStamp + 59000,
        $lt: currentStamp + 61000
      },
      dingTimes: 2,
      status: 1
    }

    const queryHalfHour = {
      startTimeStamp: {
        $gte: currentStamp + 29000,
        $lt: currentStamp + 31000
      },
      dingTimes: 1,
      status: 1
    }

    const [ordersOne, ordersHalf] = await Promise.all(find(queryOneHour), find(queryHalfHour))

    // ding他们
    if (ordersOne.length) {
      // 减去dingTimes
      await updateMany(queryOneHour, { $inc: { dingTimes: 1 } })

      let oneHourUseridList = ''
      ordersOne.forEach(item => (oneHourUseridList += item.userid + ','))
      oneHourUseridList = oneHourUseridList.substring(0, oneHourUseridList.length - 1)
      sendCorpconversation({ ...ordersOne[0], userid: oneHourUseridList })
    }

    if (ordersHalf.length) {
      // 减去dingTimes
      await updateMany(queryHalfHour, { $inc: { dingTimes: 1 } })

      let halfHourUseridList = ''
      ordersOne.forEach(item => (halfHourUseridList += item.userid + ','))
      halfHourUseridList = halfHourUseridList.substring(0, halfHourUseridList.length - 1)
      sendCorpconversation({ ...ordersOne[0], userid: halfHourUseridList })
    }
  })
}

module.exports = { ordersSchedule }
