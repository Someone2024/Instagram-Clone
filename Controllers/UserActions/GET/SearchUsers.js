const { query, where, limit, getDocs } = require("firebase/firestore");
const { UsersRef } = require("../../../FirebaseApp");

exports.SearchUsers = async (req, res) => {
    const userToSearch = req.body.user;
    const userToSearchQuery = query(UsersRef, where("username", "==", userToSearch), limit(1))
    try {
        const userToSearch = (await getDocs(userToSearchQuery)).docs[0].data()
        res.json({
            user: {
                username: userToSearch.username,
                full_name: userToSearch.full_name,
                number_of_followers: userToSearch.number_of_followers,
                profile_picture: userToSearch.profile_picture
            }
        })
    } catch (e) {
        console.log(e)
        res.json({
            error: "user not found"
        })
    }
}