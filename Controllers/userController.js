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

const UsersRef = collection(db, "Users");

exports.Register = Register;

exports.Login = Login;

exports.UserProfile = async (req, res) => {
  const { username } = req.params;
  const userQuery = query(
    UsersRef,
    where("username", "==", username),
    limit(1)
  );
  try {
    const user = await getDocs(userQuery);
    const userData = user.docs[0].data();

    if (userData.privacySettings.private) {
      res.json({
        error: "This Account is private",
      });
    }
    res.json({
      userName: userData.username,
      userBio: userData.bio,
      number_of_posts: userData.number_of_posts,
      number_of_followers: userData.number_of_followers,
      number_of_following: userData.number_of_following,
    });
  } catch (e) {}
};

exports.FollowOrUnFollowUser = FollowOrUnFollowUser