const { db } = require("../FirebaseApp");
const { collection, addDoc, Firestore } = require("firebase/firestore");
const { uid } = require("uid");

async function CreatePost(file_url, caption, type, author ) {
  try {
    postRef = await addDoc(collection(db, "Posts"), {
      id: uid(),
      author,
      file_url,
      caption,
      type,
      timestamp: new Date(),
      number_of_likes: 0,
      number_of_comments: 0,
    });

    console.log("Document written with ID: ", postRef.id);
    return postRef
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

module.exports = CreatePost