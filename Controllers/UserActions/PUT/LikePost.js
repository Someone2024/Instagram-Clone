const { PostsRef, UsersRef } = require("../../../FirebaseApp");
const {
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  increment,
  arrayUnion
} = require("firebase/firestore");

exports.LikePost = async (req, res)=>{
    const PostId = req.params.postid
    const currentUser = req.username
    const PostToUpdateQuery = query(PostsRef, where("id", "==", PostId), limit(1));
    const UserToUpdateQuery = query(
        UsersRef,
        where("username", "==", currentUser),
        limit(1)
      );
    try {
        const PostToUpdate = (await getDocs(PostToUpdateQuery)).docs[0]
        const UserToUpdate = (await getDocs(UserToUpdateQuery)).docs[0]

        /**
         * next, your gonna wanna loop through the liked_posts array
         * and verify if any of the values in it matches the PostToUpdate
         * if it does, then remove it from the liked_posts array 
         * and decrement the number of likes of the PostToUpdate
         */

        await updateDoc(PostToUpdate.ref,{
            number_of_likes: increment(1)
        })

        await updateDoc(UserToUpdate.ref,{
            liked_posts: arrayUnion(PostId)
        })

        res.json({
            message: "the posts has been liked!"
        })
    }catch(e){
        console.log(e)
        res.json({
            error: "the posts has not been liked. sad"
        })
    } 
}