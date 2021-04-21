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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Schema.Types.ObjectId,
      ref: 'Date',
      required: true
    },
    floor: {
      type: Schema.Types.ObjectId,
      ref: 'Floor',
      required: true
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    },
    period: {
      type: Schema.Types.ObjectId,
      ref: 'Period',
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

module.exports = model('Order', orderSchema)
