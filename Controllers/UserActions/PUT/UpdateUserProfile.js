const { UsersRef } = require("../../../FirebaseApp");
const {
    query,
    where,
    limit,
    getDocs,
    updateDoc,
  } = require("firebase/firestore");
exports.UpdateUserProfile = async (req, res) => {
  const { website, bio } = req.body;
  const currentUser = req.username
  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  try {
    const currentUserSnapshot = await getDocs(currentUserQuery);

    await updateDoc(currentUserSnapshot.docs[0].ref, {
      website,
      bio,
    });

    res.json({
      message: "profile updated",
    });
  } catch (e) {
    res.status(400).json({
      message: "an error updating your profile has ocurred" + e,
    });
  }
};
