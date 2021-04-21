const Floor = require('../app/models/floors')

async function initFloor () {
  const list = [
    { timming: '10:25-10:45' },
    { timming: '10:50-11:10' },
    { timming: '11:15-11:35' },
    { timming: '11:40-12:00' },
    { timming: '12:05-12:25' },
    { timming: '12:30-12:50' },
    { timming: '12:55-13:15' },
    { timming: '13:20-13:40' },
    { timming: '13:45-14:05' },
    { timming: '15:00-15:20' },
    { timming: '15:25-15:45' },
    { timming: '15:50-16:10' },
    { timming: '16:15-16:35' },
    { timming: '16:40-17:00' },
    { timming: '17:05-17:25' },
    { timming: '17:30-17:50' },
    { timming: '17:55-18:15' },
    { timming: '18:20-18:40' },
    { timming: '18:45-19:05' }
  ]

  const massageDate = [
    '2021-05-24',
    '2021-05-26',
    '2021-05-28',
    '2021-05-31',
    '2021-06-02',
    '2021-06-04',
    '2021-06-07',
    '2021-06-08',
    '2021-06-09',
    '2021-06-10',
    '2021-06-11',
    '2021-06-15',
    '2021-06-16',
    '2021-06-17'
  ]

  const count = 2

  function setReservation () {
    const copyList = JSON.parse(JSON.stringify(list))
    copyList.forEach(item => {
      item.count = count
    })

    const obj = {}
    massageDate.forEach(item => {
      obj[item] = copyList
    })

    return obj
  }

  const data = {
    floorName: '休闲区',
    count,
    location: '北塔',
    reservation: setReservation()
  }

  await new Floor(data).save()
}

initFloor()