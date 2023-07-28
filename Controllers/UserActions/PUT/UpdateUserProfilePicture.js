const { storage } = require("../../../FirebaseApp");
const { ref, uploadBytes } = require("firebase/storage");
const  fs  = require("fs/promises");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const handleFile = upload.single("file")

exports.UpdateUserProfilePicture = async (req, res) => {
  //here is where we encode the image into a string
  //then in routes that require the users profile pic
  //we get the base64 string from the profile_picture in the user model
  //decode it into an image format
  //and then we send that in the response as json
  const fileData = req.file;
  const encodedFile = (await fs.readFile(fileData.path)).toString("base64");
  const BufferedFile = Buffer.from(encodedFile, "base64")
  const imagesDir = await fs.mkdir("decoded/", {recursive: true})
  const decodedFile = await fs.writeFile(`decoded/${fileData.originalname}`, BufferedFile)

  res.json({
    decodedFile
  })

  // const deleteDir = await fs.rm(`decoded/${fileData.originalname}`)
};