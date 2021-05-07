/**
 * @description user router
 * @author 飞翔
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/users' })
const { getDingUserInfo } = require('../controllers/users')
// const { genValidator } = require('../middlewares/validator')
// const loginValidate = require('../validators/login')

// router.use(genValidator(loginValidate))
router.get('/:id', getDingUserInfo)

module.exports = router
