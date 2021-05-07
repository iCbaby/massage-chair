/**
 * @description login router
 * @author 飞翔
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/login' })
const { login } = require('../controllers/login')
const { genValidator } = require('../middlewares/validator')
const loginValidate = require('../validators/login')

router.use(genValidator(loginValidate))
router.post('/', login)

module.exports = router
