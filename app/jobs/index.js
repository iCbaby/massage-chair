/**
 * @description schedule
 * @author 飞翔
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
        $gte: currentStamp + 3540000,
        $lt: currentStamp + 3660000
      },
      dingOneHour: false,
      status: 1
    }
    const queryHalfHour = {
      startTimeStamp: {
        $gte: currentStamp + 1740000,
        $lt: currentStamp + 1860000
      },
      dingHalfHour: false,
      status: 1
    }
    const [ordersOne, ordersHalf] = await Promise.all([find(queryOneHour), find(queryHalfHour)])

    // ding他们
    if (ordersOne.length) {
      await updateMany(queryOneHour, { $set: { dingOneHour: true } })

      let oneHourUseridList = ''
      ordersOne.forEach(item => (oneHourUseridList += item.userid + ','))
      oneHourUseridList = oneHourUseridList.substring(0, oneHourUseridList.length - 1)
      sendCorpconversation({ ...ordersOne[0]._doc, userid: oneHourUseridList, hourText: '一小时' })
    }

    if (ordersHalf.length) {
      await updateMany(queryHalfHour, { $set: { dingHalfHour: true } })

      let halfHourUseridList = ''
      ordersHalf.forEach(item => (halfHourUseridList += item.userid + ','))
      halfHourUseridList = halfHourUseridList.substring(0, halfHourUseridList.length - 1)
      sendCorpconversation({
        ...ordersHalf[0]._doc,
        userid: halfHourUseridList,
        hourText: '半小时'
      })
    }
  })
}

module.exports = { ordersSchedule }
