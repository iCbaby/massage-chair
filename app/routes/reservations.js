/**
 * @description reservation router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/reservations' })
const { findReservations } = require('../controllers/reservations')

router.get('/', findReservations)

module.exports = router
