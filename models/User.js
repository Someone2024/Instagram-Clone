const {db} = require("../FirebaseApp")
const jwtController = require("../Controllers/jwtController")
const {collection, addDoc, Firestore} = require("firebase/firestore")

async function createUser(email, full_name, username, password) {
    try {
        userRef = await addDoc(collection(db, "Users"), {
            email,
            full_name,
            username,
            password: await jwtController.hashPassword(password)
        })
        console.log("Document written with ID: ", userRef.id);
    }catch (e) {
        console.error("Error adding document: ", e);
    }
}

module.exports = createUser;