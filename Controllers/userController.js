const {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  limit,
} = require("firebase/firestore");
const { db } = require("../FirebaseApp");
const { Register } = require("./UserActions/RegisterUser");
const { Login } = require("./UserActions/LoginUser");
const { FollowOrUnFollowUser } = require("./UserActions/FollowOrUnUser");
const { GetUserProfile } = require("./UserActions/GetUserProfile");

exports.Register = Register;

exports.Login = Login;

exports.GetUserProfile = GetUserProfile

exports.FollowOrUnFollowUser = FollowOrUnFollowUser