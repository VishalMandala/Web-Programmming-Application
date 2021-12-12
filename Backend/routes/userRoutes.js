const express = require("express")
const auth = require("../data/auth")
const requireLogin = require("../middleware/requireLogin")

const router = express.Router()
const User = require("../models/users")


router.post("/signUp",auth.signup)
router.post("/signIn",auth.signin)
router.patch("/:id",auth.updateUserData)
router.get("/:id", auth.getUserById)
router.post("/reset-password",auth.resetPassword)
router.post("/new-password/:token",auth.newPassword)



router.get("/protected",requireLogin,auth.signin)

module.exports = router;