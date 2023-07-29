const { getDocs, query, where, limit } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.GetUserProfile = async (req, res) => {
  const userToGet = req.params.username;
  const currentUser = req.username

  const userToGetQuery = query(
    UsersRef,
    where("username", "==", userToGet),
    limit(1)
  );

  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  try {
    const userToGet = await getDocs(userToGetQuery);
    const userToGetData = userToGet.docs[0].data();

    const currentUser = await getDocs(currentUserQuery);
    const currentUserData = currentUser.docs[0].data();

    const verifyUserToGetRelationShip = userToGetData.relationShips.some(
      (obj) => {
        if (
          obj["username"] === currentUserData.username &&
          obj["relationShip_type"] === "blocked"
        )
          return true;
        else false;
      }
    );

    if (userToGetData.privacySettings.private_account) {
      res.json({
        userName: userToGetData.username,
        error: "This Account is private",
      });
    } else if(verifyUserToGetRelationShip){
      res.json({
        error: "This user either has blocked you or you have bloked them",
      });
    }
    else {
      res.json({
        userName: userToGetData.username,
        userBio: userToGetData.bio,
        profile_picture: userToGetData.profile_picture,
        number_of_posts: userToGetData.number_of_posts,
        number_of_followers: userToGetData.number_of_followers,
        number_of_following: userToGetData.number_of_following,
      });
    }
  } catch (e) {}
};
