const express = require("express")
const authExpert = require("../data/expertProfileAuth")
const allExperts = require("../data/GetExperts")
const router = express.Router()

router.get("/",allExperts.getAllExperts)
router.post("/signUpForExpert",authExpert.signupExpert)
router.post("/signInForExpert",authExpert.signInExpert)
router.get("/:id",allExperts.getExpertById)
router.patch("/:id",allExperts.updateExpertData)
// router.get("/protected",requireLogin,auth.signin)


module.exports = router;