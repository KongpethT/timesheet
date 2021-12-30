const express = require('express')
const router = express.Router()

const { getPosts, getPostById, getPostByQuery, getPostByLogin } = require('../controller/timeline_controller')

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

module.exports = router