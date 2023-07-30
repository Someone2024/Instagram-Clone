const { db } = require("../FirebaseApp");
const { collection, addDoc } = require("firebase/firestore");
const { uid } = require("uid");

async function CreateComment(content, postId, author ) {
  try {
    commentRef = await addDoc(collection(db, "Comments"), {
      id: uid(),
      content,
      author,
      postId,
      timestamp: new Date(),
    });

    console.log("Document written with ID: ", commentRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

module.exports = CreateComment