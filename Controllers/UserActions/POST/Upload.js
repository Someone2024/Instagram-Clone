const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials/serviceAccountKey.json");
const upload = multer({ dest: "videos/" });
const {fs, unlinkSync} = require("fs")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://intagram-clone-8d19d.appspot.com/",
});

const bucket = admin.storage().bucket();

exports.Upload = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No video file uploaded" });
  }
  try {
    // Upload video file to Firebase Storage
    const fileUploadOptions = {
      destination: 'videos/' + file.originalname,
      metadata: {
        contentType: file.mimetype,
      },
    };

    await bucket.upload(file.path, fileUploadOptions);

    // Get the publicly accessible URL of the uploaded video
    const uploadedFile = await bucket.file(fileUploadOptions.destination).get();
    const fileUrl = uploadedFile[0].metadata.mediaLink;

    // Delete the temporary file on the server after successful upload
    unlinkSync(file.path);

    // Return the URL to the client
    return res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    return res.status(500).json({ error: 'Failed to upload video' });
  }
};
