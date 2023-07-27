const { Register } = require("./UserActions/RegisterUser");
const { Login } = require("./UserActions/LoginUser");
const { FollowOrUnFollowUser } = require("./UserActions/FollowOrUnUser");
const { GetUserProfile } = require("./UserActions/GetUserProfile");
const { BlockOrUnBlockUser } = require("./UserActions/BlockOrUnUser");

exports.Register = Register;

exports.Login = Login;

exports.GetUserProfile = GetUserProfile;

exports.FollowOrUnFollowUser = FollowOrUnFollowUser;

exports.BlockOrUnUser = BlockOrUnBlockUser;