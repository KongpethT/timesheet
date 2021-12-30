const express = require('express')
const router = express.Router()

const { getPosts, getPostById, getPostByQuery, getPostByLogin } = require('../controller/signin_controller');

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

router.route('/:name/:password')
    .get(getPostByLogin)

module.exports = router