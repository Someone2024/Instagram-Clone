const { query, where, limit, getDocs, doc } = require("firebase/firestore")
const { PostsRef, CommentsRef, UsersRef } = require("../../../FirebaseApp")

exports.GetUserSinglePosts = async(req, res) =>{
    const PostId = req.params.postid
    const postToGetQuery = query(PostsRef, where("id","==", PostId), limit(1))
    const commentsToGetQuery = query(CommentsRef, where("postId", "==", PostId))
    
    try{
        const postToGet = (await getDocs(postToGetQuery)).docs[0].data()
        const commentsToGet = (await getDocs(commentsToGetQuery)).docs.map(doc => doc.data())
        const authorToGetQuery = query(UsersRef, where("username", "==", postToGet.author))
        const authorToGet = (await getDocs(authorToGetQuery)).docs[0]
        console.log()
        res.json({
            post: {
                post: {
                    file: postToGet.file_url,
                    number_of_likes: postToGet.number_of_likes,
                    number_of_comments: postToGet.number_of_comments,
                },
                Comments:commentsToGet,
                author: {
                    username: authorToGet.data().username,
                    profile_picture: authorToGet.data().profile_picture
                },
            }
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            error: "This post does not exist"
        })
    }
}