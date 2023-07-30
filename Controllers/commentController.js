const { CommentPost } = require("./UserActions/POST/CommentPost");
const { DeleteComment } = require("./UserActions/DELETE/DeleteComment");

//POST requests
exports.CommentPost = CommentPost;

//DELETE requests

exports.DeleteComment = DeleteComment