const express = require('express')
const router = express.Router()

const {
    getPosts,
    getPostByIdAgency,
    getPostByIdClient,
    postPostAgency,
    getPostsClientType,
    agencyDeleted,
    postPostClient,
    clientDeleted,
    getProcess,
    agencyUpdate,
    clientUpdate
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

router.route('/agency/update')
    .put(agencyUpdate)
router.route('/client/update')
    .put(clientUpdate)

router.route('/agency/deleted/:id')
    .delete(agencyDeleted)

router.route('/client/deleted/:id')
    .delete(clientDeleted)
module.exports = router