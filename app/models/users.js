/**
 * @description user schema 用户
 * @author iC
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
    }
  },
  { timestamps: true }
)
module.exports = model('User', userSchema)
