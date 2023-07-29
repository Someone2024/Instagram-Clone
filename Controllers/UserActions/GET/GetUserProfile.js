const { getDocs, query, where, limit, orderBy } = require("firebase/firestore");
const { UsersRef, PostsRef } = require("../../../FirebaseApp");

exports.GetUserProfile = async (req, res) => {
  const userToGet = req.params.username;
  const currentUser = req.username
  const compareCurrentUserToUserToGet = currentUser === userToGet
  console.log({currentUser, userToGet})

  const userToGetQuery = query(
    UsersRef,
    where("username", "==", userToGet),
    limit(1)
  );

  const userToGetPostsQuery = query(
    PostsRef,
    where("author", "==", userToGet),
    orderBy("timestamp", "desc")
  )

  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  try {
    const userToGet = await getDocs(userToGetQuery);
    const userToGetData = userToGet.docs[0].data();

    const userToGetPosts = await getDocs(userToGetPostsQuery);
    const userToGetActualPosts = [];
    userToGetPosts.forEach((postDoc) => {
      userToGetActualPosts.unshift(postDoc.data());
    });
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

    if(compareCurrentUserToUserToGet){
      res.json({
        isCurrentUser: compareCurrentUserToUserToGet,
        website: userToGetData.website,
        userName: userToGetData.username,
        userBio: userToGetData.bio,
        number_of_posts: userToGetData.number_of_posts,
        number_of_followers: userToGetData.number_of_followers,
        number_of_following: userToGetData.number_of_following,
        posts: userToGetActualPosts,
        profile_picture: userToGetData.profile_picture,
      });
    }
    else if (userToGetData.privacySettings.private_account) {
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
        isCurrentUser: compareCurrentUserToUserToGet,
        website: userToGetData.website,
        userName: userToGetData.username,
        userBio: userToGetData.bio,
        number_of_posts: userToGetData.number_of_posts,
        number_of_followers: userToGetData.number_of_followers,
        number_of_following: userToGetData.number_of_following,
        posts: userToGetActualPosts,
        profile_picture: userToGetData.profile_picture,
      });
    }

  } catch (e) {
    res.status(400).json({
      Message: "User is either not found or not existant"
    });
  }
};
