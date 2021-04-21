/**
 * @description order schema 2020春节
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
    cardType: {
      type: String,
      enum: ['玩', '美', '赢', '家'],
      required: true
    },
    remark: {
      type: String,
      trim: true,
      required: true
    },
    fromUserId: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    fromUserName: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    fromUserDept: {
      type: String,
      trim: true,
      required: true
    },
    fromUserMobile: {
      type: String,
      trim: true,
      required: true
    },
    toUserId: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    toUserName: {
      type: String,
      index: true,
      trim: true,
      required: true
    },
    toUserDept: {
      type: String,
      trim: true,
      required: true
    },
    toUserMobile: {
      type: String,
      trim: true,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = model('SpringFestivalOrders', orderSchema)
