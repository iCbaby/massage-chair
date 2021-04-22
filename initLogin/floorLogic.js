const Floor = require('../app/models/floors')
const { massageTimimg, massageDate, locationList } = require('./originData')

async function initFloor () {
  locationList.forEach(item => {
    item.reservation = setReservation(item)
    new Floor(item).save()
  })

  function setReservation (floor) {
    const copyList = JSON.parse(JSON.stringify(massageTimimg))
    copyList.forEach(item => {
      item.startTime = item.timing.split('-')[0] + ':00'
      item.endTime = item.timing.split('-')[1] + ':00'
      item.count = floor.count
    })

    const obj = {}
    massageDate.forEach(item => {
      obj[item] = copyList
    })

    return obj
  }
}

module.exports = { initFloor }
