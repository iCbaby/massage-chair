/**
 * @description user schema 用户
 * @author 飞翔
 */

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false
    },
    userid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    banWeek: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)
module.exports = model('User', userSchema)
