const express = require('express')
const router = express.Router()

const { getPosts, getPostById, postPosts } = require('../controller/person_controller');

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPosts)

router.route('/')
    .post(postPosts)

module.exports = router