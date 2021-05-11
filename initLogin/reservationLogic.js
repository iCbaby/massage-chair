const Reservation = require('../app/models/reservations')
const { massageTimimg, massageDate, locationList } = require('./originData')

async function initReservation () {
  const list = []

  locationList.forEach(item => {
    massageTimimg.forEach(subItem => {
      massageDate.forEach(tItem => {
        const obj = {
          floorName: item.floorName,
          count: item.count,
          timing: subItem.timing,
          startTime: subItem.timing.split('-')[0] + ':00',
          endTime: subItem.timing.split('-')[1] + ':00',
          date: tItem,
          startTimeStamp: new Date(tItem + ' ' + subItem.timing.split('-')[0] + ':00')
        }
        list.push(new Reservation(obj).save())
      })
    })
  })
  for await (const res of list) {
    console.log(res)
  }
  console.log(list.length)
}

module.exports = { initReservation }
