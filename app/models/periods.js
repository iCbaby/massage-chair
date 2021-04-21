/**
 * @description period schema 时间段
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const periodSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    timePeriod: {
      type: String,
      trim: true,
      required: true
    },
    periodStrartTime: {
      type: String,
      trim: true,
      required: true
    },
    periodEndTime: {
      type: String,
      trim: true,
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

module.exports = model('Period', periodSchema)
