const jwtController = require("./jwtController");
const createUser = require("../models/User");
const {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  limit,
} = require("firebase/firestore");
const { db } = require("../FirebaseApp");
const UsersRef = collection(db, "Users");

exports.Register = async (req, res) => {
  const { email, full_name, username, password } = req.body;
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

exports.UserProfile = async (req, res) => {
  const { username } = req.params;
  const userQuery = query(
    UsersRef,
    where("username", "==", username),
    limit(1)
  );
  try {
    const user = await getDocs(userQuery);
    const userData = user.docs[0].data();

    if (userData.privacySettings.private) {
      res.json({
        error: "This Account is private",
      });
    }
    res.json({
      userName: userData.username,
      userBio: userData.bio,
      number_of_posts: userData.number_of_posts,
      number_of_followers: userData.number_of_followers,
      number_of_following: userData.number_of_following,
    });
  } catch (e) {}
};

exports.FollowUser = async (req, res) => {
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

    await updateDoc(userToFollowSnapshot.docs[0].ref, {
      number_of_followers: + 1,
      relationShips: [
        {
          username: currentUserData.username,
          relationShip_type: "follower",
        },
      ],
    });

    await updateDoc(currentUserSnapshot.docs[0].ref, {
      number_of_following: + 1,
      relationShips: [
        {
          username: userToFollowData.username,
          relationShip_type: "following",
        },
      ],
    });

  res.json({
    Message: "Success"
  })
  
  } catch (err) {
    res.status(500).json({
      message: "Failed to log in.",
      err,
    });
  }
};
