const { db } = require("../FirebaseApp");
const jwtController = require("../Controllers/jwtController");
const { collection, addDoc, Firestore } = require("firebase/firestore");

async function createUser(email, full_name, username, password) {
  try {
    userRef = await addDoc(collection(db, "Users"), {
      email,
      full_name,
      username,
      password: await jwtController.hashPassword(password),
      bio: "",
      profile_picture: "",
      number_of_following: 0,
      number_of_followers: 0,
      number_of_posts: 0,
      liked_posts: [],
      relationShips: [],
      privacySettings: {
        private: false,
        posts: "",
        followers: "",
        following: ""
      }
    });
    console.log("Document written with ID: ", userRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

module.exports = createUser;
