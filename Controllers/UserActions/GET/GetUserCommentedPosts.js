const { query, where, getDocs, limit } = require("firebase/firestore");
const { CommentsRef, PostsRef, UsersRef } = require("../../../FirebaseApp");

exports.GetUserCommentedPosts = async (req, res) => {
  const currentUser = req.username;
  const commentsToGetQuery = query(
    CommentsRef,
    where("author", "==", currentUser)
  );
  try {
    const commentsToGet = (await getDocs(commentsToGetQuery)).docs;
    let CommentedPosts = [];
    for (let i = 0; i < commentsToGet.length; i++) {
      const post = (await getDocs(
        query(
          PostsRef,
          where("id", "==", commentsToGet[i].data().postId),
          limit(1)
        )
      )).docs[0]
      const postAuthor = (await getDocs(
        query(
          UsersRef,
          where("username", "==", post[i].data().author),
          limit(1)
        )
      )).docs[0]
      const commentAuthor = (await getDocs(
        query(
          UsersRef,
          where("username", "==", commentsToGet[i].data().author),
          limit(1)
        )
      )).docs[0]
      const commentReport = {
        post: {
            author: {
                username: postAuthor.data().username,
                profile_picture: postAuthor.data().profile_picture
            },
            postCaption: post.data().caption,         
            file_url: post.data().file_url           
        },
        comment: {
            author: commentAuthor.data().author,
            content: commentsToGet[i].data().content
        }
      }
      CommentedPosts.push(commentReport)
    }
    res.json({CommentedPosts})
  } catch (e) {
    console.log(e)
    res.json({err: "error"})
  }
};
