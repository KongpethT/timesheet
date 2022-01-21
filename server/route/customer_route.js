const express = require('express')
const router = express.Router()

const {
    getPosts,
    getPostByIdAgency,
    getPostByIdClient,
    postPostAgency,
    getPostsClientType,
    deletePostById,
    postPostClient,
    getProcess,
    puts
} = require('../controller/customer_controller')

router.route('/')
    .get(getPosts)

router.route('/agency')
    .post(postPostAgency)

router.route('/agency/:id')
    .get(getPostByIdAgency)

router.route('/client')
    .post(postPostClient)

router.route('/client/:id')
    .get(getPostByIdClient)

router.route('/clientType')
    .get(getPostsClientType)

router.route('/process')
    .get(getProcess)

router.route('/puts')
    .put(puts)

module.exports = router