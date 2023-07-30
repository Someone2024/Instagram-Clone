const CreateComment = require("../../../models/Comment")

exports.CommentPost = async(req, res)=>{
    const {content} = req.body
    const PostId = req.params.postid
    const currentUser = req.username
    try{
        await CreateComment(content, PostId, currentUser)
        res.json({
            message: "Success creating a comment"
        })
    }catch (e) {
        console.error("Error adding document: ", e);
        res.json({
            Error: "Error creating a comment"
        })
    }
}