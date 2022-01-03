const express = require('express')
const router = express.Router()

const { getPosts, getPostById, postPostById } = require('../controller/customer_controller')

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

router.route('/:id')
    .post(postPostById)

module.exports = router