const  fs  = require("fs/promises");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const handleFile = upload.single("file")
const {
  query,
  where,
  limit,
  getDocs,
  updateDoc,
} = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.UpdateUserProfilePicture = async (req, res) => {
  const fileData = req.file;
  const encodedFile = `data:image/png;base64,${(await fs.readFile(fileData.path)).toString("base64")}`;
  const currentUser = req.username;
  const currentUserQuery = query(
    UsersRef,
    where("username", "==", currentUser),
    limit(1)
  );

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/svg+xml",
    "image/vnd.microsoft.icon",
    "image/jfif",
  ];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    res.json({
      message: "Error file format",
    })
    await fs.rm(`${fileData.path}`)
    return
  } 

  try {
    const currentUserSnapshot = await getDocs(currentUserQuery);

    await updateDoc(currentUserSnapshot.docs[0].ref, {
      profile_picture: encodedFile
    });

    res.json({
      message: fileData
    })
    await fs.rm(`${fileData.path}`)
  }catch(e) {
    res.json({
      message: "an error has ocurred" + e
    })
  }
};