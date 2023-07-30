const { query, deleteDoc, getDocs, where } = require("firebase/firestore")
const { CommentsRef } = require("../../../FirebaseApp");

exports.DeleteComment = async(req, res)=>{
    const CommentId = req.params.commentid
    const CommentToDeleteQuery  = query(CommentsRef,where("id", "==", CommentId))
    try{
        const CommentToDelete = (await getDocs(CommentToDeleteQuery)).docs[0].ref
        await deleteDoc(CommentToDelete)
        res.json({
            message: "comment deleted successfully"
        })
    }catch(e){
        console.log(e)
        res.json({
            Error: "The comment you are trying to delete either has been deleted or does not exist"
        })
    }
}