/**
 * @description 加密
 * @author 飞翔
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/crypConf')

/**
 * sha256 加密
 * @param {String} content 明文
 */
function sha256 (content) {
  const sha256 = crypto.createHash('sha256')
  return sha256.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {String} content 明文
 */
function doCrypto (content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return sha256(str)
}

module.exports = { doCrypto }
