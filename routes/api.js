const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const checkAuh = require("../Controllers/checkAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    // Use the original file name
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//GET Requests
router.get("/:username", checkAuh, userController.GetUserProfile);

//POST Requests
router.post("/register", userController.Register);
router.post("/login", userController.Login);

router.post("/:username/follow", checkAuh, userController.FollowOrUnFollowUser);
router.post("/:username/block", checkAuh, userController.BlockOrUnBlockUser);

//PUT requests
router.post("/settings/profile", checkAuh, upload.single("file"), userController.UpdateUserProfile);
router.put("/settings/privacy", checkAuh, userController.UpdateUserPrivacy);

module.exports = router;
