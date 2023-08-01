const { query, where, getDocs } = require("firebase/firestore")
const { PostsRef, CommentsRef, UsersRef } = require("../../../FirebaseApp")

exports.GetUserSinglePosts = async(req, res) =>{
    const PostId = req.params.postId
    const postToGetQuery = query(PostsRef, where("id","==", PostId), limit(1))
    const commentsToGetQuery = query(CommentsRef, where("postId", "==", PostId))
    

    try{
        const postToGet = (await getDocs(postToGetQuery)).docs[0].data()
        const commentsToGet = (await getDocs(commentsToGetQuery)).docs
        const authorToGetQuery = query(UsersRef, where("username", "==", postToGet.data().author))
        const authorToGet = (await getDocs(authorToGetQuery)).docs[0]

        res.json({
            post: {
                author: {
                    username: authorToGet.data().username,
                    profile_picture: authorToGet.data().profile_picture
                },
                comments: commentsToGet,
                post: {
                    file: postToGet.file_url,
                    number_of_likes: postToGet.number_of_likes,
                    number_of_comments: postToGet.number_of_comments,
                }
            }
        })
    }catch(e){
        res.json({
            error: "This post does not exist"
        })
    }
}