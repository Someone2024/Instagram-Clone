const {
  updateDoc,
  getDocs,
  query,
  where,
  limit,
  arrayRemove,
  arrayUnion,
} = require("firebase/firestore");
const { UsersRef } = require("../../FirebaseApp");

exports.BlockOrUnBlockUser = async (req, res) => {
  const currentUser = req.username;
  const userToFollow = req.params.username;

  const userToBlockQuery = query(
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
    const userToBlockSnapshot = await getDocs(userToBlockQuery);
    const currentUserSnapshot = await getDocs(currentUserQuery);

    const userToBlockData = userToBlockSnapshot.docs[0].data();
    const currentUserData = currentUserSnapshot.docs[0].data();

    const verifyUserToBlockRelationShip = userToBlockData.relationShips.some(
      (obj) => {
        if (
          obj["username"] === currentUserData.username &&
          obj["relationShip_type"] === "blocked"
        )
          return true;
        else false;
      }
    );

    const updateBothUsers = async (
      usertoupdate,
      relationshiptypetoupdate,
      usertoupdaterelationshipwith
    ) => {
      await updateDoc(usertoupdate.docs[0].ref, {
        relationShips: arrayUnion({
          username: usertoupdaterelationshipwith,
          relationShip_type: relationshiptypetoupdate,
        }),
      });
    };

    const deleteRelationShip = async (
      usertoupdate,
      relationshiptypetoupdate,
      usertoupdaterelationshipwith
    ) => {
      await updateDoc(usertoupdate.docs[0].ref, {
        relationShips: arrayRemove({
          username: usertoupdaterelationshipwith,
          relationShip_type: relationshiptypetoupdate,
        }),
      });
    };

    if (!verifyUserToBlockRelationShip) {
      await updateBothUsers(
        userToBlockSnapshot,
        "blocked",
        currentUserData.username
      );

      await updateBothUsers(
        currentUserSnapshot,
        "blocked",
        userToBlockData.username
      );

      res.json({
        message: "the user has been bloked",
      });
    } else {
      await deleteRelationShip(
        userToBlockSnapshot,
        "blocked",
        currentUserData.username
      );

      await deleteRelationShip(
        currentUserSnapshot,
        "blocked",
        userToBlockData.username
      );

      res.json({
        message: "already bloked this user",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to block this user." + err,
    });
  }
};
