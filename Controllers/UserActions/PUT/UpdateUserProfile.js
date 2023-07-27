const { updateDoc, query, where, limit, getDocs } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://intagram-clone-8d19d.appspot.com/", // Replace with your storage bucket name
});

const bucket = admin.storage().bucket();
const upload = multer();

exports.UpdateUserProfile = async (req, res) => {
  const { bio } = req.body;

  // Handle file upload
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific error handling
      return res.status(400).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // Other errors
      return res.status(500).json({ error: "Error uploading file: " + err.message });
    }

    try {
      const currentUserQuery = query(
        UsersRef,
        where("username", "==", req.username),
        limit(1)
      );
      const currentUserSnapshot = await getDocs(currentUserQuery);
      const userDocRef = currentUserSnapshot.docs[0].ref;

      // Get the uploaded file (if it exists)
      const uploadedFile = req.file;
      let fileUrl = null;

      // If file was uploaded, store it in Firebase Storage
      if (uploadedFile) {
        const fileUpload = bucket.file(uploadedFile.originalname);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: uploadedFile.mimetype,
          },
        });

        blobStream.on("error", (error) => {
          console.error("Error uploading file:", error);
          return res.status(500).json({ error: "Error uploading file." });
        });

        blobStream.on("finish", () => {
          // Get the public URL of the uploaded file
          fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

          // Update the user profile with the bio and file URL
          updateProfile(userDocRef, bio, fileUrl);
        });

        blobStream.end(uploadedFile.buffer);
      } else {
        // No file was uploaded, update the user profile without the file URL
        updateProfile(userDocRef, bio, null);
      }

      // Helper function to update the user profile
      async function updateProfile(docRef, bio, fileUrl) {
        const dataToUpdate = { bio };

        if (fileUrl) {
          dataToUpdate.profile_picture = fileUrl;
        }

        await updateDoc(docRef, dataToUpdate);

        res.json({ message: "success" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the profile." });
    }
  });
};
