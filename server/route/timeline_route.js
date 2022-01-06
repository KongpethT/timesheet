const express = require('express')
const router = express.Router()

const {
    getPosts,
    getPostById,
    postPostByQuery,
    getPostCountById,
    deletePostById } = require('../controller/timeline_controller')

router.route('/')
    .get(getPosts)

router.route('/:id/:id2')
    .get(getPostById)

router.route('/count/:id/:id2')
    .get(getPostCountById)

router.route('/')
    .post(postPostByQuery)

router.route('/:id')
    .delete(deletePostById)

module.exports = router