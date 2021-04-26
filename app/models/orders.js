/**
 * @description order schema 预约订单
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const orderSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    user: {
      type: String,
      trim: true,
      index: true,
      required: true
    },
    userid: {
      type: String,
      trim: true,
      index: true,
      required: true
    },
    date: {
      type: String,
      trim: true,
      required: true
    },
    floorName: {
      type: String,
      trim: true,
      required: true
    },
    location: {
      type: String,
      trim: true,
      required: true
    },
    timing: {
      type: String,
      trim: true,
      required: true
    },
    dayOfWeek: {
      type: Number,
      required: true
    },
    status: {
      type: Number,
      index: true,
      required: true
    },
    dingTimes: {
      type: Number,
      index: true,
      default: 2
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

module.exports = model('Order', orderSchema)
