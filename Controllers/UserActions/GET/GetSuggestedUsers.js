const { getDocs, query, where, limit, orderBy } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.GetSuggestedUsers = async (req, res) => {
  const userToGet = req.params.username;

  const userToGetQuery = query(
    UsersRef,
    where("username", "==", userToGet),
    limit(1)
  );
  try {
    const suggestedUsers = (await getDocs(userToGetQuery)).docs[0].data()
      .relationShips;
    const SuggestedUsersCopy = [...suggestedUsers];
    const filteredSuggestedUsers = SuggestedUsersCopy.filter(
      (user) => user.relationShip_type === "follower"
    );
    let finalUsers = [];
    for (let i = 0; i < filteredSuggestedUsers.length; i++) {
      const user = (
        await getDocs(
          query(UsersRef, where("username", "==", filteredSuggestedUsers[i].username), limit(1))
        )
      ).docs[0].data();
      const userObj = {
        username: user.username,
        bio: user.bio,
        profilePic: user.profile_picture
      }
      finalUsers.push(userObj)
    }
    res.json({
      suggestedUsers: finalUsers,
    });
  } catch (e) {
    res.json({
      error: "an error has occurred",
    });
  }
};
