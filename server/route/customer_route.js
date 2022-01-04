const express = require('express')
const router = express.Router()

const {
    getPosts,
    getPostByIdAgency,
    getPostByIdClient,
    postPostById,
    getPostsClientType
} = require('../controller/customer_controller')

router.route('/')
    .get(getPosts)

router.route('/agency/:id')
    .get(getPostByIdAgency)

router.route('/client/:id')
    .get(getPostByIdClient)

router.route('/clientType')
    .get(getPostsClientType)

router.route('/:id')
    .post(postPostById)

module.exports = router