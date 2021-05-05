const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
const { massageDate } = require('./originData')
const DateClass = require('../app/models/dates')

dayjs.extend(weekOfYear)

let i = 0
let dateObj = dayjs() // 日期的初始dayjs对象。控制模拟 确定几时开始算

async function initDate (params) {
  if (i >= 28) return

  const formatDate = dateObj.format('YYYY-MM-DD') // 格式化完年月日的日期

  const isMassageDate = massageDate.includes(formatDate)
  const canChooseDate = []
  const dayOfWeek = dateObj.day() // 星期几 0星期日,6星期六

  if (isMassageDate) canChooseDate.push(formatDate)

  if (
    massageDate.includes(dateObj.add(1, 'day').format('YYYY-MM-DD')) &&
    [1, 2, 3, 4].includes(dayOfWeek)
  ) {
    canChooseDate.push(dateObj.add(1, 'day').format('YYYY-MM-DD'))
  } else if (massageDate.includes(dateObj.add(3, 'day').format('YYYY-MM-DD')) && dayOfWeek === 5) {
    canChooseDate.push(dateObj.add(3, 'day').format('YYYY-MM-DD'))
  } else if (formatDate === '2021-06-11') {
    canChooseDate.push('2021-06-15')
  }

  const data = {
    date: formatDate,
    dateStrartTime: formatDate + ' 00:00:00',
    dateEndTime: formatDate + ' 23:59:59',
    isMassageDate,
    canChooseDate,
    dayOfWeek,
    week: dateObj.week(),
    tag: '',
    remark: ''
  }
  await new DateClass(data).save()

  dateObj = dateObj.add(1, 'day') // 加一日
  i++

  initDate()
}

module.exports = { initDate }
