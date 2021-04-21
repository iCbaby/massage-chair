const dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')

const DateClass = require('../app/models/dates')

dayjs.extend(weekOfYear)

let i = 0
let dateObj = dayjs('2021-05-21')
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

async function saveDate (params) {
  if (i >= 28) return

  const formatDate = dateObj.format('YYYY-MM-DD')

  const isMassageDate = massageDate.includes(formatDate)
  const canChooseDate = []
  const dayOfWeek = dateObj.day()

  if (isMassageDate) {
    canChooseDate.push(formatDate)
  }

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

  dateObj = dateObj.add(1, 'day')
  i++

  saveDate()
}

saveDate()
