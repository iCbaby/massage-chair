/**
 * @description floors router
 * @author 飞翔
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/floors' })
const { findFloors } = require('../controllers/floors')

router.get('/', findFloors)

module.exports = router
