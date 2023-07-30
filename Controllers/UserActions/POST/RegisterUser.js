const { getDocs, query, where, collection } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");
const createUser = require("../../../models/User");

exports.Register = async (req, res) => {
  const { email, full_name, username, password } = req.body;
  const usersQuery = query(UsersRef, where("username", "==", username));
  try {
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      const user = await createUser(email, full_name, username, password);
      res.json({
        message: "User Created!",
      });
    } else {
      res.json({
        Error: "That username has already been taken",
      });
    }
  } catch (e) {
    res.json({
      message: "error" + e,
    });
  }
};
