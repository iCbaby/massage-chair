/**
 * @description order router 2002春节
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/springFestivalOrders' })
const {
  findCards,
  findCardsByFromUserId,
  findCardsByToUserId,
  cardDetail,
  sendCard,
  readCard,
  sendCorpconversation,
  haveUnreadCard,
  comCorpconversation
} = require('../controllers/springFestivalOrders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/springFestivalOrders')

router.use(genValidator(orderValidate))
router.get('/', findCards)
router.get('/send/:id', findCardsByFromUserId)
router.get('/receive/:id', findCardsByToUserId)
router.get('/:id', cardDetail)
router.get('/unread/:id', haveUnreadCard)
router.post('/icbaby', comCorpconversation)
router.post('/', sendCard, sendCorpconversation)
router.post('/:id', readCard)

module.exports = router
