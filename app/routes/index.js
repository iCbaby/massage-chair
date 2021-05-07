/**
 * @description 统一挂在路由
 * @author 飞翔
 */

const fs = require('fs')
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}
