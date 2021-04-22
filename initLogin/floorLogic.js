const Floor = require('../app/models/floors')
const { locationList } = require('./originData')

async function initFloor () {
  locationList.forEach(item => {
    new Floor(item).save()
  })
}

module.exports = { initFloor }
