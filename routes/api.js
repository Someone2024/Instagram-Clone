const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")
const checkAuh = require("../Controllers/checkAuth")

//GET Requests
router.get("/:username", checkAuh, userController.GetUserProfile)

//POST Requests
router.post("/register", userController.Register);
router.post("/login", userController.Login);

router.post("/:username/follow", checkAuh, userController.FollowOrUnFollowUser)

module.exports = router;