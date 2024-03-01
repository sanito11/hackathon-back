const express = require('express')
const router = express.Router()
const { register, handleLogin } = require('../controllers/userController')

// router.get("/", )


router.post("/login", handleLogin)

router.post("/register", register)

module.exports = router