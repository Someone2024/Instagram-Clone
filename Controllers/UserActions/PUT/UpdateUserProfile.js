const { updateDoc, query, where, limit, getDocs } = require("firebase/firestore");
const { storage } = require("../../../FirebaseApp");
const { ref, uploadBytes } = require("firebase/storage");

exports.UpdateUserProfile = async (req, res) => {
  const userProfileImages = ref(storage, "images/req.filename")
  uploadBytes(userProfileImages, ).then(snapshot => {
    ref.json(snapshot)
  })
};
