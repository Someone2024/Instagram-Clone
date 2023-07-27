const { updateDoc, query, where, limit, getDocs } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.UpdateUserProfile = async (req, res) => {
  const currentUser = req.username;
  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );

  const {username, bio} = req.body

  try {
    const currentUserSnapshot = await getDocs(currentUserQuery);

    await updateDoc(currentUserSnapshot.docs[0].ref, {
        username,
        bio
    })
    req.username = username
    console.log(req.username)
    res.json({message: "success"})
  }catch(error){
    res.json({error: "the error"+ error})
  }
};
