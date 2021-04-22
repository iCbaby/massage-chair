const Location = require('../app/models/locations')

async function initLocation () {
  await Promise.all([
    new Location({ locationName: '中悦' }).save(),
    new Location({ locationName: '西馆' }).save(),
    new Location({ locationName: '北塔' }).save()
  ])
}

module.exports = { initLocation }
