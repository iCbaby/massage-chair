/**
 * @description reservations schema 楼层
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const reservationSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    floorName: {
      type: String,
      trim: true,
      index: true,
      required: true
    },
    date: {
      type: String,
      trim: true,
      index: true,
      required: true
    },
    timing: {
      type: String,
      trim: true,
      index: true,
      required: true
    },
    startTime: {
      type: String,
      trim: true,
      required: true
    },
    endTime: {
      type: String,
      trim: true,
      required: true
    },
    count: {
      type: Number,
      min: 0,
      default: 0
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

module.exports = model('Reservation', reservationSchema)
