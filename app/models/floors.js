/**
 * @description floor schema 楼层
 * @author iC
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const floorSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    floorName: {
      type: String,
      trim: true,
      required: true
    },
    count: {
      type: Number,
      min: 0,
      default: 0
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
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

module.exports = model('Floor', floorSchema)
