const { GetUserProfile } = require("./UserActions/GET/GetUserProfile");

const { Register } = require("./UserActions/POST/RegisterUser");
const { Login } = require("./UserActions/POST/LoginUser");
const { FollowOrUnFollowUser } = require("./UserActions/POST/FollowOrUnUser");
const { BlockOrUnBlockUser } = require("./UserActions/POST/BlockOrUnUser");
const { Upload } = require("./UserActions/POST/Upload");
const { CommentPost } = require("./UserActions/POST/CommentPost");

const { UpdateUserPrivacy } = require("./UserActions/PUT/UpdateUserPrivacy");
const { UpdateUserProfilePicture } = require("./UserActions/PUT/UpdateUserProfilePicture");
const { UpdateUserProfile } = require("./UserActions/PUT/UpdateUserProfile");
const { LikePost } = require("./UserActions/PUT/LikePost");

const { DeletePost } = require("./UserActions/DELETE/DeletePost");
const { DeleteUserAccount } = require("./UserActions/DELETE/DeleteUserAccount");
const { DeleteComment } = require("./UserActions/DELETE/DeleteComment");

//GET requests
exports.GetUserProfile = GetUserProfile;

//POST requests
exports.FollowOrUnFollowUser = FollowOrUnFollowUser;

exports.BlockOrUnBlockUser = BlockOrUnBlockUser;

exports.Upload = Upload;

exports.Register = Register;

exports.Login = Login;

exports.CommentPost = CommentPost;

//PUT requests
exports.UpdateUserPrivacy = UpdateUserPrivacy;

exports.UpdateUserProfilePicture = UpdateUserProfilePicture;

exports.UpdateUserProfile = UpdateUserProfile;

exports.LikePost = LikePost;

//DELETE requests

exports.DeletePost = DeletePost; //Delete comments associated with the post

exports.DeleteUserAccount = DeleteUserAccount; //Delete comments associated with the user

exports.DeleteComment = DeleteComment