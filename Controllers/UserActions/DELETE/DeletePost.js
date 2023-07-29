const { deleteDoc, increment, updateDoc } = require("firebase/firestore");
const { getDocs, query, where, limit } = require("firebase/firestore");
const { PostsRef, UsersRef } = require("../../../FirebaseApp");

exports.DeletePost = async (req, res) => {
  const PostId = req.params.postid;
  const currentUser = req.username;
  console.log(currentUser);

  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  const PostToDeleteQuery = query(
    PostsRef,
    where("id", "==", PostId),
    limit(1)
  );

  try {
    const currentUser = (await getDocs(currentUserQuery)).docs[0].ref;
    const PostToDelete = (await getDocs(PostToDeleteQuery)).docs[0].ref;
    await deleteDoc(PostToDelete);
    await updateDoc(currentUser, {
      number_of_posts: increment(-1),
    });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "The post either does not exist or has been deleted" });
  }
};
