const { query, getDocs, limit, where } = require("firebase/firestore");
const { PostsRef, UsersRef } = require("../../../FirebaseApp");

exports.GetInfiniteFeedPosts = async (req, res) => {
  const limitPost = req.params.limit;
  const PostsQuery = query(PostsRef, limit(limitPost));
  try {
    const Posts = (await getDocs(PostsQuery)).docs;
    let PostsToReturn = [];
    for (let i = 0; i < Posts.length; i++) {
      const user = (
        await getDocs(
          query(
            UsersRef,
            where("username", "==", Posts[i].data().author),
            limit(1)
          )
        )
      ).docs[0].data();
      const postObj = {
        post: {
          id: Posts[i].data().id,
          file: Posts[i].data().file_url,
        },
        author: {
          username: user.username,
          profile_picture: user.profile_picture,
        },
      };
      PostsToReturn.push(postObj);
    }

    res.json({ PostsToReturn });
  } catch (e) {
    console.log(e);
  }
};
