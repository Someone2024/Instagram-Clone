const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")

//GET Requests
router.get("/:username", userController.UserProfile)

//POST Requests
router.post("/register", userController.Register);
router.post("/login", userController.Login);

module.exports = router;