/**
 * @description order router 2020双十一
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/orders' })
const {
  findCards,
  findCardsByFromUserId,
  findCardsByToUserId,
  cardDetail,
  sendCard,
  readCard,
  sendCorpconversation,
  haveUnreadCard
} = require('../controllers/orders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/orders')

router.use(genValidator(orderValidate))
router.get('/', findCards)
router.get('/send/:id', findCardsByFromUserId)
router.get('/receive/:id', findCardsByToUserId)
router.get('/:id', cardDetail)
router.get('/unread/:id', haveUnreadCard)
router.post('/', sendCard, sendCorpconversation)
router.post('/:id', readCard)

module.exports = router
