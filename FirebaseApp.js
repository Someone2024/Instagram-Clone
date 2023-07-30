const {initializeApp} = require("firebase/app")
const { getFirestore } = require("firebase/firestore")
const {collection} = require("firebase/firestore")
const {getStorage, ref} = require("firebase/storage")
require("dotenv").config

const firebaseConfig = {
    apiKey: "AIzaSyCETUz72R0uSbIB-_0b48oUoGu-8Lj2qO8",
    authDomain: "intagram-clone-8d19d.firebaseapp.com",
    projectId: "intagram-clone-8d19d",
    storageBucket: "gs://intagram-clone-8d19d.appspot.com/",
    messagingSenderId: "708060846981",
    appId: "1:708060846981:web:4bad62ef7a4709973302ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

const UsersRef = collection(db, "Users");
const PostsRef = collection(db, "Posts");
const CommentsRef = collection(db, "Comments");

module.exports = {
    db,
    UsersRef,
    PostsRef,
    CommentsRef,
    storage
}