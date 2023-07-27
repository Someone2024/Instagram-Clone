const {
  updateDoc,
  getDocs,
  query,
  where,
  limit,
  arrayRemove,
  arrayUnion,
  increment,
  
} = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.FollowOrUnFollowUser = async (req, res) => {
  const currentUser = req.username;
  const userToFollow = req.params.username;

  const userToFollowQuery = query(
    UsersRef,
    where("username", "==", userToFollow),
    limit(1)
  );
  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  try {
    const userToFollowSnapshot = await getDocs(userToFollowQuery);
    const currentUserSnapshot = await getDocs(currentUserQuery);

    const userToFollowData = userToFollowSnapshot.docs[0].data();
    const currentUserData = currentUserSnapshot.docs[0].data();

    const verifyUserToFollowRelationShip = userToFollowData.relationShips.some(
      (obj) => {
        if (
          obj["username"] === currentUserData.username &&
          obj["relationShip_type"] === "follower"
        )
          return true;
        else false;
      }
    );
    const updateBothUsers = async (
      usertoupdate,
      fieldtoupdate,
      relationshiptoupdate,
      usertoupdaterelationshipwith,
    ) => {
      await updateDoc(usertoupdate.docs[0].ref, {
        [fieldtoupdate]: increment(1),
        relationShips: arrayUnion({
          username: usertoupdaterelationshipwith,
          relationShip_type: relationshiptoupdate,
        },)
      });
    };

    const deleteRelationShip = async (
      usertoupdate,
      fieldtoupdate,
      operationtoexecute,
      relationshipToDelete,
      usertoupdaterelationshipwith
    ) => {
      await updateDoc(usertoupdate.docs[0].ref, {
        [fieldtoupdate]: increment(-1),
        relationShips: arrayRemove({
          username: usertoupdaterelationshipwith,
          relationShip_type: relationshipToDelete,
        },)
      });
    };

    if (!verifyUserToFollowRelationShip) {
      await updateBothUsers(
        userToFollowSnapshot,
        "number_of_followers",
        "follower",
        currentUserData.username,
      );

      await updateBothUsers(
        currentUserSnapshot,
        "number_of_following",
        "following",
        userToFollowData.username,
      );

      res.json({
        message: "user followed :)",
      });
    } else {
      await deleteRelationShip(
        userToFollowSnapshot,
        "number_of_followers",
        "-",
        "follower",
        currentUserData.username,
      );

      await deleteRelationShip(
        currentUserSnapshot,
        "number_of_following",
        "-",
        "following",
        userToFollowData.username,
      );

      res.json({
        message: "already following this user, unfollowing now...",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to follow this user." + err,
    });
  }
};
