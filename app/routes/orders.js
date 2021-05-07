/**
 * @description order router
 * @author 飞翔
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/orders' })
const { findOrders, reserve, cancelReserve, setDing } = require('../controllers/orders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/orders')

router.use(genValidator(orderValidate))
router.get('/', findOrders)
router.post('/', reserve, setDing)
router.post('/cancel/:id', cancelReserve)

module.exports = router
