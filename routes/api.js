const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")

router.post("/register", userController.Register);

module.exports = router;