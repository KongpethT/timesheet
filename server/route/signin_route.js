const express = require('express')
const router = express.Router()

const { getPosts, getPostById, getPostByQuery, getPostByLogin, demo } = require('../controller/signin_controller');

router.route('/')
    .get(getPosts)
   

router.route('/:id')
    .get(getPostById)
   


router.route('/')
    .post(getPostByLogin)
    



module.exports = router