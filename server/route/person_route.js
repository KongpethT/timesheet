const express = require('express')
const router = express.Router()

const { getPosts, getPostById, postPosts, postPostResetPassword, postPostChangePassword } = require('../controller/person_controller');

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

router.route('/')
    .post(postPosts)

router.route('/resetPassword')
    .put(postPostResetPassword)

router.route('/changedPassword')
    .put(postPostChangePassword)

module.exports = router