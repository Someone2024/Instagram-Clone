const { query, where, limit, getDocs, deleteDoc, deleteField, updateDoc } = require("firebase/firestore");
const { UsersRef, PostsRef } = require("../../../FirebaseApp");

exports.DeleteUserAccount = async (req, res) => {
  const currentUser = req.username;
  const userToDeleteQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );
  const PostsByUserToDeleteQuery = query(
    PostsRef,
    where("author", "==", currentUser)
  )
  const relationshipsWithCurrentUserQuery = query(
    UsersRef,
  );
  try{
    const userToDelete = (await getDocs(userToDeleteQuery)).docs[0]
    const PostsByUserToDelete = (await getDocs(PostsByUserToDeleteQuery)).docs
    const relationshipsWithCurrentUser = (await getDocs(relationshipsWithCurrentUserQuery))
    PostsByUserToDelete.forEach(async post => await deleteDoc(post.ref))

    res.json({
        message: "Success deleting your account. It may take some time to reflect the changes"
    })

    relationshipsWithCurrentUser.forEach(async relation => {
        const updatedArray = [...relation.data().relationShips]
        const hasRelation = updatedArray.some(obj => obj["username"] === userToDelete.data().username)
        if(hasRelation){
            const filteredArray = updatedArray.filter(relation => relation.username !== currentUser)
            console.log(updatedArray)
            console.log(filteredArray)
            await updateDoc(relation.ref, {
                relationShips: filteredArray
            })
        }
    });
    await deleteDoc(userToDelete.ref)
  }catch(e){
    console.log(e)
    res.json({
        error: "This user either has been deleted or does not exists"
    })
  }
};

//Todo: Delete relationships with the userToDelete from other users
//The relationships with user to delete query is not returning anything