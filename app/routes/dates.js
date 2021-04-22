/**
 * @description date router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/dates' })
const { findDates } = require('../controllers/dates')

router.get('/', findDates)

module.exports = router
