const { Upload } = require("./UserActions/POST/Upload");
const { LikePost } = require("./UserActions/PUT/LikePost");
const { DeletePost } = require("./UserActions/DELETE/DeletePost");


//GET requests
// exports.GetPost = GetPost;

//POST requests

exports.Upload = Upload;

//PUT requests

exports.LikePost = LikePost;

//DELETE requests

exports.DeletePost = DeletePost; 