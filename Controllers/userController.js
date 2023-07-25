const jwtController = require("./jwtController")
const createUser = require("../models/User")
const {collection, getDocs, query, where} = require("firebase/firestore")
const {db} = require("../FirebaseApp")

exports.Register = async (req, res)=> {
    const {email, full_name, username, password} = req.body;
    const UsersRef = collection(db, "Users")
    const usersQuery = query(UsersRef, where("username", "==", username))
    try {
        const usersSnapshot = await getDocs(usersQuery)

        if(usersSnapshot.empty) {
            const user = await createUser(email, full_name, username, password)
        }else {
            res.json({
                Error: "That username has already been taken"
            })
        }
    }catch(e) {
        res.json({
            Error: e
        })
    }
}