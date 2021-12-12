const express = require("express")
const router = express.Router()
const contactData = require('../data/contactData.js')
router.post("/",contactData.contactDatPost)
module.exports = router