const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const postController = require("../Controllers/postController");
const commentController = require("../Controllers/commentController");

const checkAuth = require("../Controllers/checkAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET Requests
router.get("/users/:username", checkAuth, userController.GetUserProfile);
// router.get("/users/:username/suggested", checkAuth, userController.GetSuggestedUsers);
// router.get("/users/:username/interactions/likes", checkAuth, userController.GetLikedPosts);
// router.get("/users/:username/posts", checkAuth, userController.GetUsersPosts);
// router.get("/users/:username/posts/:postid", checkAuth, userController.GetPostById);
// router.get("/explore/:limit", checkAuth, userController.GetInfiniteScrollPosts);
// router.get("/reels/:reelid", checkAuth, userController.GetReelPost);
// router.get("/search/users", checkAuth, userController.SearchUsers);

// POST Requests
router.post("/users/register", userController.Register);
router.post("/users/login", userController.Login);
router.post("/users/:username/follow", checkAuth, userController.FollowOrUnFollowUser);
router.post("/users/:username/block", checkAuth, userController.BlockOrUnBlockUser);
router.post("/users/:postid/comment", checkAuth, commentController.CommentPost);
router.post("/users/:postid/like", checkAuth, postController.LikeAndDislikePost);

router.post("/users/upload/:type", upload.single("post"), checkAuth, postController.Upload);

// PUT Requests
router.put("/users/settings/profile", checkAuth, userController.UpdateUserProfile);
// router.put("/users/settings/profile-picture", checkAuth, userController.UpdateUserProfilePicture);
router.put("/users/settings/privacy", checkAuth, userController.UpdateUserPrivacy);

// DELETE Requests
router.delete("/users/posts/delete/:postid", checkAuth, postController.DeletePost);
router.delete("/users/settings/delete-account", checkAuth, userController.DeleteUserAccount);
router.delete("/users/delete/comment/:commentid", checkAuth, commentController.DeleteComment);

module.exports = router;
