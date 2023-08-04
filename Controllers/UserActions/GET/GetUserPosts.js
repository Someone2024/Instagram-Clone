const { query, where, getDocs } = require("firebase/firestore")
const { PostsRef } = require("../../../FirebaseApp")

exports.GetUserPosts = async (req, res) => {
    const currentUser = req.username
    const postsToGetQuery = query(PostsRef, where("author", "==", currentUser)) 
    try {
        const postsToGet = (await getDocs(postsToGetQuery)).docs
        const userPosts = []
        for (let i = 0; i < postsToGet.length; i++) {
            const post = {
                id: postsToGet[i].data().id,
                file_url: postsToGet[i].data().file_url
            }
            userPosts.push(post)            
        }
        res.json({userPosts})
    } catch (e) {
        console.log(e)        
    }
}