const { query, where, or, getDocs, limit } = require("firebase/firestore");
const { PostsRef } = require("../../../FirebaseApp");

exports.GetExplorePosts = async (req, res) => {
    const postsLimit = req.params.limit
  const explorePosts = query(
    PostsRef,
    where("type", "==", "media", or, where("type", "==", "video"),),
    limit(postsLimit)
  );
  try {
    const posts = (await getDocs(explorePosts)).docs
    let exploredPosts = []
    for (let i = 0; i < posts.length; i++) {
        const post = {
            id: posts[i].data().id,
            file_url: posts[i].data().file_url,
            number_of_likes: posts[i].data().number_of_likes,
            number_of_comments: posts[i].data().number_of_comments,
        }        
        exploredPosts.push(post)
    }
    res.json({exploredPosts})
  } catch (e) {
    console.log(e)
    res.json({e:"error"})
  }
};
