const { GetUserProfile } = require("./UserActions/GET/GetUserProfile");
const { GetUserSinglePosts } = require("./UserActions/GET/GetUserSinglePosts");
const { GetSuggestedUsers } = require("./UserActions/GET/GetSuggestedUsers");
const {
  GetInfiniteFeedPosts,
} = require("./UserActions/GET/GetInfiniteFeedPosts");
const { SearchUsers } = require("./UserActions/GET/SearchUsers");
const { GetUserLikedPosts } = require("./UserActions/GET/GetUserLikedPosts");
const { GetUserCommentedPosts } = require("./UserActions/GET/GetUserCommentedPosts");

const { Register } = require("./UserActions/POST/RegisterUser");
const { Login } = require("./UserActions/POST/LoginUser");
const { FollowOrUnFollowUser } = require("./UserActions/POST/FollowOrUnUser");
const { BlockOrUnBlockUser } = require("./UserActions/POST/BlockOrUnUser");

const { UpdateUserPrivacy } = require("./UserActions/PUT/UpdateUserPrivacy");
const {
  UpdateUserProfilePicture,
} = require("./UserActions/PUT/UpdateUserProfilePicture");
const { UpdateUserProfile } = require("./UserActions/PUT/UpdateUserProfile");

const { DeleteUserAccount } = require("./UserActions/DELETE/DeleteUserAccount");

//GET requests
exports.GetUserProfile = GetUserProfile;

exports.GetSuggestedUsers = GetSuggestedUsers;

exports.GetUserSinglePosts = GetUserSinglePosts;

exports.GetInfiniteFeedPosts = GetInfiniteFeedPosts;

exports.SearchUsers = SearchUsers;

exports.GetUserLikedPosts = GetUserLikedPosts;

exports.GetUserCommentedPosts = GetUserCommentedPosts;

//POST requests
exports.FollowOrUnFollowUser = FollowOrUnFollowUser;

exports.BlockOrUnBlockUser = BlockOrUnBlockUser;

exports.Register = Register;

exports.Login = Login;

//PUT requests
exports.UpdateUserPrivacy = UpdateUserPrivacy;

exports.UpdateUserProfilePicture = UpdateUserProfilePicture;

exports.UpdateUserProfile = UpdateUserProfile;

//DELETE requests

exports.DeleteUserAccount = DeleteUserAccount; //Delete comments associated with the user
