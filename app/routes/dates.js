/**
 * @description date router
 * @author 飞翔
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/dates' })
const { findDates } = require('../controllers/dates')

router.get('/', findDates)

module.exports = router
