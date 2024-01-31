const express = require('express')
const {
    getPosts
} = require('../controller/postsController.js')

const router = express.Router()

router.get('/post').get(getPosts)

module.exports = router