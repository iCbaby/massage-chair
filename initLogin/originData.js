// 按摩日期
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
  '2021-06-17' // 14日
]

// 初始时间段
const massageTimimg = [
  { timing: '10:25-10:45' },
  { timing: '10:50-11:10' },
  { timing: '11:15-11:35' },
  { timing: '11:40-12:00' },
  { timing: '12:05-12:25' },
  { timing: '12:30-12:50' },
  { timing: '12:55-13:15' },
  { timing: '13:20-13:40' },
  { timing: '13:45-14:05' },
  { timing: '15:00-15:20' },
  { timing: '15:25-15:45' },
  { timing: '15:50-16:10' },
  { timing: '16:15-16:35' },
  { timing: '16:40-17:00' },
  { timing: '17:05-17:25' },
  { timing: '17:30-17:50' },
  { timing: '17:55-18:15' },
  { timing: '18:20-18:40' },
  { timing: '18:45-19:05' } // 19个时间段
]

// floor数据
const locationList = [
  {
    floorName: '12楼电话间',
    count: 1,
    location: '中悦'
  },
  {
    floorName: '12B健身房',
    count: 3,
    location: '中悦'
  },
  {
    floorName: '12B母婴室',
    count: 3,
    location: '中悦'
  },
  {
    floorName: '16楼电话间',
    count: 1,
    location: '中悦'
  },
  {
    floorName: '18楼电话间',
    count: 1,
    location: '中悦'
  },
  {
    floorName: '西馆健身房',
    count: 2,
    location: '西馆'
  },
  {
    floorName: '北塔休闲区',
    count: 2,
    location: '北塔'
  } // 7个办公区
]

module.exports = { massageDate, massageTimimg, locationList }
