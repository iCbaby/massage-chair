/**
 * @description date schema 日期
 * @author 飞翔
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const dateSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    date: {
      type: String,
      trim: true,
      required: true
    },
    dateStrartTime: {
      type: String,
      trim: true,
      required: true
    },
    dateEndTime: {
      type: String,
      trim: true,
      required: true
    },
    isMassageDate: {
      type: Boolean,
      required: true
    },
    canChooseDate: {
      type: [String]
    },
    dayOfWeek: {
      type: Number, // 0(星期天)到6(星期六)
      required: true
    },
    week: {
      type: Number, // 属于第几周
      required: true
    },
    tag: {
      type: String,
      trim: true,
      default: ''
    },
    remark: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
)

module.exports = model('Date', dateSchema)
