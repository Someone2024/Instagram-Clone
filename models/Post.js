const { db } = require("../FirebaseApp");
const { collection, addDoc, Firestore } = require("firebase/firestore");
const { ui } = require("uid");

async function CreatePost(file) {
  try {
    postRef = await addDoc(collection(db, "Users"), {
      id: ui(),
      file,
      type: "",
      timestamp: new Date(),
      number_of_likes: "",
      number_of_comments: "reference comments with the id",
      author: "reference an author",
    });
    console.log("Document written with ID: ", postRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

module.exports = CreatePost