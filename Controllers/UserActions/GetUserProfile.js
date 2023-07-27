const { getDocs, query, where, limit } = require("firebase/firestore");
const { UsersRef } = require("../../FirebaseApp");

exports.GetUserProfile = async (req, res) => {
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
