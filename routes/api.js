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
router.post("/:username/block", checkAuh, userController.BlockOrUnBlockUser)

//PUT requests
router.put("/settings/profile", checkAuh, userController.UpdateUserProfile)
router.put("/settings/privacy", checkAuh, userController.UpdateUserPrivacy)


module.exports = router;