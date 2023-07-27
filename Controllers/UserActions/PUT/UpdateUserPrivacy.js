const { UsersRef } = require("../../../FirebaseApp");
const {
  query,
  where,
  limit,
  getDocs,
  updateDoc,
} = require("firebase/firestore");

exports.UpdateUserPrivacy = async (req, res) => {
  const currentUser = req.username;
  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );

  try {
    const currentUserSnapshot = await getDocs(currentUserQuery);
    const currentUserData = currentUserSnapshot.docs[0].data();

    if (!currentUserData.privacySettings.private_account) {
      await updateDoc(currentUserSnapshot.docs[0].ref, {
        privacySettings: {
          private_account: true,
        },
      });

      res.json({
        message:
          "privacy settings set to true"
      });
    } else {
      await updateDoc(currentUserSnapshot.docs[0].ref, {
        privacySettings: {
          private_account: false,
        },
      });
      res.json({
        message: "privacy settings set to false"
      });
    }
  } catch (e) {
    res.json({
      error: "Error updating privacy settings" + e,
    });
  }
};
