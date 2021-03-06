const express = require('express')
const router = express.Router()

const { gets, getById, getCountById, getCountAll, posts, puts, deleted } = require('../controller/sales_controller')

router.route('/all/:para')
    .get(gets)

router.route('/:para')
    .get(getById)

router.route('/countAll/:para')
    .get(getCountAll)

router.route('/count/:para')
    .get(getCountById)

router.route('/')
    .post(posts)

router.route('/')
    .put(puts)
router.route('/deleted/:id')
    .delete(deleted)
module.exports = router
