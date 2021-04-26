/**
 * @description order router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/orders' })
const { findOrders, reserve, cancelReserve, setDing } = require('../controllers/orders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/orders')

router.use(genValidator(orderValidate))
router.get('/', findOrders)
router.post('/', reserve, setDing)
router.delete('/cancel/:id', cancelReserve)

module.exports = router
