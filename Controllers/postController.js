const { Upload } = require("./UserActions/POST/Upload");
const { LikeAndDislikePost } = require("./UserActions/PUT/LikeAndDislikePost");
const { DeletePost } = require("./UserActions/DELETE/DeletePost");


//GET requests

//POST requests

exports.Upload = Upload;

//PUT requests

exports.LikeAndDislikePost = LikeAndDislikePost;

//DELETE requests

exports.DeletePost = DeletePost; 