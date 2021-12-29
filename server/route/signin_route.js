const express = require('express')
const router = express.Router()

/*
module.exports = (app) => {
    const index = require('../controller/signin_controller')
    app.post('/signin', index.signin)

}
*/

const { getPosts, getPostById, getPostByQuery, getPostByLogin } = require('../controller/signin_controller');

router.route('/')
    .get(getPosts)

router.route('/:id')
    .get(getPostById)

router.route('/:name/:password')
    .get(getPostByLogin)
module.exports = router