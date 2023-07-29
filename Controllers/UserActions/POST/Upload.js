const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials/serviceAccountKey.json");
const upload = multer({ dest: "videos/" });
const {fs, unlinkSync} = require("fs");
const { getDownloadURL, ref } = require("firebase/storage");
const {storage} = require("../../../FirebaseApp")
const CreatePost = require("../../../models/Post");
const { updateDoc, increment } = require("firebase/firestore");
const { getDocs, query, where, limit, } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://intagram-clone-8d19d.appspot.com/",
});

const bucket = admin.storage().bucket();

exports.Upload = async (req, res) => {
  const file = req.file;
  const author = req.username;
  const authorQuery = query(
    UsersRef,
    where("username", "==", author),
    limit(1)
  )
  const {type} = req.params
  if (!file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }else if(!["video", "media", "reel", "story"].includes(type)){
    return res.status(400).json({ error: "File type not specified" });
  }
  try {
    // Upload video file to Firebase Storage
    const fileUploadOptions = {
      destination: 'videos/' + file.originalname,
      metadata: {
        contentType: ".png",
      },
    };
    const currentAuthor = await getDocs(authorQuery);

    await bucket.upload(file.path, fileUploadOptions);

    //download the file
    const finalUrl = ref(storage, 'videos/' + file.originalname) 
    const file_url = await getDownloadURL(finalUrl)

    const newPost = await CreatePost(file_url, type, author)

    await updateDoc(currentAuthor.docs[0].ref, {
      number_of_posts: increment(1)
    })

    // Delete the temporary file on the server after successful upload
    unlinkSync(file.path);

    // Return the URL to the client
    res.json({ newPost: file_url });
  } catch (error) {
    console.error('Error uploading video:', error);
    return res.status(500).json({ error: 'Failed to upload video' });
  }
};
