const { query, where, limit, getDocs } = require("firebase/firestore");
const { UsersRef, PostsRef } = require("../../../FirebaseApp");

exports.GetUserLikedPosts = async(req, res) => {
    const currentUser = req.username;
    console.log(currentUser)
    const currentUserQuery = query(UsersRef, where("username", "==", currentUser), limit(1))
    try {
        const userLikedPosts = (await getDocs(currentUserQuery)).docs[0].data().liked_posts   
        let posts = []  
        for (let i = 0; i < userLikedPosts.length; i++) {
            const postQuery = query(PostsRef, where("id", "==", userLikedPosts[i]))
            const post = (await getDocs(postQuery)).docs[0]
            const postObj = {
                postId: post.data().id,
                file_url: post.data().file_url
            }
            posts.push(postObj)
        }   
        res.json({
            liked_posts: posts
        })
    } catch (e) {
        console.log(e)
        res.json({
            error: "couldn't get any of you liked posts"
        })
    }
}