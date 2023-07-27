const { getDocs, query, where, limit } = require("firebase/firestore");
const jwtController = require("../jwtController");
const { UsersRef } = require("../../FirebaseApp");

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const userQuery = query(UsersRef, where("email", "==", email), limit(1));

  try {
    const user = await getDocs(userQuery);

    if (user.empty) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const passwordMatch = await jwtController.comparePasswords(
      password,
      user.docs[0].data().password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwtController.generateToken({
      username: user.docs[0].data().username,
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to log in." });
  }
};
