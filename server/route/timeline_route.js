const express = require('express')
const router = express.Router()

const { getPosts, getPostById, postPostByQuery, getPostByLogin } = require('../controller/timeline_controller')

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

router.route('/')
    .post(postPostByQuery)

module.exports = router