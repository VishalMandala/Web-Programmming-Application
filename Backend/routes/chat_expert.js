// const stripe = require('stripe')("sk_test_51K1a0NJO0kMgjOQWHDkItuSH6v0xoLrpLi9hnHAGoWvhqUbJ1yGl2iXez5XeqltZgOVvSayKplawilkA8TBmLfJO008sydcjae")

const express = require("express")
// const { router } = require("../app")
const chat_expert = require('../data/chat_expert')
const router = express.Router()
// const { router } = require("../app")
router.post('/start-chat',chat_expert.chatExpert)
module.exports = router
