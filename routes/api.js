const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const checkAuh = require("../Controllers/checkAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
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

router.post(
  "/upload/:type",
  upload.single("post"),
  checkAuh,
  userController.Upload
);

//PUT requests
router.put("/:postid/like", checkAuh, userController.LikePost);
router.put(
  "/settings/profile/picture",
  upload.single("file"),
  checkAuh,
  userController.UpdateUserProfilePicture
);
router.put(
  "/settings/profile/privacy",
  checkAuh,
  userController.UpdateUserPrivacy
);
router.put("/settings/profile", checkAuh, userController.UpdateUserProfile);

//DELETE requests
router.delete("/delete/:postid", checkAuh, userController.DeletePost)
router.delete("/settings/delete-account", checkAuh, userController.DeleteUserAccount)

module.exports = router;
