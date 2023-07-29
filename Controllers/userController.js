const { Register } = require("./UserActions/POST/RegisterUser");
const { Login } = require("./UserActions/POST/LoginUser");
const { FollowOrUnFollowUser } = require("./UserActions/POST/FollowOrUnUser");
const { GetUserProfile } = require("./UserActions/GET/GetUserProfile");
const { BlockOrUnBlockUser } = require("./UserActions/POST/BlockOrUnUser");
const { UpdateUserPrivacy } = require("./UserActions/PUT/UpdateUserPrivacy");
const { UpdateUserProfilePicture } = require("./UserActions/PUT/UpdateUserProfilePicture");
const { UpdateUserProfile } = require("./UserActions/PUT/UpdateUserProfile");

exports.Register = Register;

exports.Login = Login;

exports.GetUserProfile = GetUserProfile;

exports.FollowOrUnFollowUser = FollowOrUnFollowUser;

exports.BlockOrUnBlockUser = BlockOrUnBlockUser;

exports.UpdateUserPrivacy = UpdateUserPrivacy;

exports.UpdateUserProfilePicture = UpdateUserProfilePicture;

exports.UpdateUserProfile = UpdateUserProfile;