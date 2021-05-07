/**
 * @description location date 地点
 * @author 飞翔
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const locationSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    locationName: {
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

module.exports = model('Location', locationSchema)
