const jwtController = require("./jwtController");
const createUser = require("../models/User");
const {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} = require("firebase/firestore");
const { db } = require("../FirebaseApp");

exports.Register = async (req, res) => {
  const { email, full_name, username, password } = req.body;
  const UsersRef = collection(db, "Users");
  const usersQuery = query(UsersRef, where("username", "==", username));
  try {
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      const user = await createUser(email, full_name, username, password);
    } else {
      res.json({
        Error: "That username has already been taken",
      });
    }
  } catch (e) {
    res.json({
      Error: e,
    });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const usersRef = collection(db, "Users");
  const userQuery = query(
    usersRef,
    where("email", "==", email),
    limit(1)
  );

  try {
    const user = await getDocs(userQuery);

    if (user.empty) {
      //if it does not exist create it
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await jwtController.comparePasswords(
      password,
      user.docs[0].data().password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwtController.generateToken({ username: user.docs[0].data().username });

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to log in." });
  }
};
