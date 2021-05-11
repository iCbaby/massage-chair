/**
 * @description 发钉钉通知
 * @author 飞翔
 */

const axios = require('axios').default
const { getCorpconversationUrl } = require('../apis/dingDing')
const { AGENT_ID } = require('../config/dingConf')
const { getTime } = require('../utils/getTime')

/**
 * 发钉钉消息
 * @param {Object} obj ding信息
 */
async function sendCorpconversation ({ userid, date, floorName, timing, hourText }) {
  const str = hourText
    ? `亲爱的大赢家，您预约的空中舒压舱将在${hourText}后开始，请提前5分钟至${floorName}并扫码签到哦！一周内若未签到2次，将被锁定一周的预约资格！`
    : `亲爱的大赢家，您预约的空中舒压舱将在${date} ${
        timing.split('-')[0]
      }:00开始，请提前5分钟至${floorName}并扫码签到哦！一周内若未签到2次，将被锁定一周的预约资格！`

  const url = await getCorpconversationUrl()
  await axios.post(url, {
    agent_id: AGENT_ID,
    userid_list: userid,
    msg: {
      msgtype: 'oa',
      oa: {
        message_url: 'eapp://pages/mine/mine',
        head: {
          bgcolor: 'FFBBBBBB',
          text: '头部标题'
        },
        body: {
          title: '618舒压舱提醒您',
          form: [
            {
              key: '提醒：',
              value: str
            },
            {
              key: '发送时间：',
              value: getTime()
            }
          ],
          content: '请点击进入小程序查看',
          author: '空中舒压舱'
        }
      }
    }
  })
}

module.exports = { sendCorpconversation }
