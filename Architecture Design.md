// Instagram Clone API Documentation

// Models

- User model
  - email: String
  - full_name: String
  - username: String
  - password: String
  - profile_picture: String
  - number_of_posts: Num
  - number_of_followers: Num
  - number_of_following: Num
  - relationships: Array
    - userId: ObjectId
    - typeOfRelationship: String
  - privacySettings: Object
    - posts: String (Values: "public", "followers", or "private")
    - followers: String (Values: "public" or "private")
    - following: String (Values: "public" or "private")
  - liked_posts: Array

- Post model
  - file: (image or video) Binary data
  - type: String (Values: media, story, or reel)
  - timestamp: Date
  - number_of_likes: Num
  - comments: Array (push comments here when created)
  - author: String (reference to an author)

- Comment model
  - content: String
  - timestamp: Date
  - post: ObjectId (reference a post)
  - author: ObjectId (reference an author)

// Endpoints

**Note**: Remember to send the user data as JSON on login.

// GET Requests

- `GET /users/:username`
  - Displays a user profile.

- `GET /users/:username/suggested`
  - Displays suggested users by looking into the users' profile relationships array and retrieving the ones with the relationship type set as follower.

- `GET /users/:username/interactions/likes`
  - Displays every like made by the current user.

- `GET /users/:username/posts/`
  - Displays every post made by the current user.

- `GET /users/:username/posts/:postid`
  - Displays a post of type either video or image.

- `GET /explore/:limit`
  - Displays an infinite scroll of posts.

- `GET /reels/:reelid`
  - Displays a post of type reel.

- `GET /search/users?username`
  - Returns a list of users with the provided name.

// POST Requests

- `POST /users/register`
  - Registers a user.

- `POST /users/login`
  - Logs in a user.

- `POST /users/:username/follow`
  - Adds a new relationship object to both users' "relationships" arrays, indicating the type as "followed" for the follower and "following" for the user being followed, thereby adding one to its followers count.

- `POST /users/:username/block`
  - Adds a new relationship object to both users' "relationships" arrays, indicating the type as "blocked" for the current user and "blocked" for the user being blocked.

- `POST /users/:postid/like`
  - Adds a like to the posts.

- `POST /users/:postid/comment`
  - Creates a comment on a post.

- `POST /users/upload/:type`
  - Allows users to upload a post.

// PUT Requests

- `PUT /users/:username/settings/profile`
  - Updates user profile settings. The request body can contain the updated privacy settings for the user.

- `PUT /users/:username/settings/privacy`
  - Updates user profile privacy settings.

// DELETE Requests

- `DELETE /users/:username/posts/:postid`
  - Deletes a user post.

- `DELETE /users/settings/delete-account`
  - Deletes a user account.

- `DELETE /users/:postid/delete/comment/:commentid`
  - Deletes a user comment.

- `DELETE /users/:username/unfollow`
  - Removes the relationship object from both users' "relationships" arrays, thereby removing one from its followers count.

- `DELETE /users/:username/unblock`
  - Removes the relationship object from both users' "relationships" arrays, thereby unblocking the user.

I have updated the endpoints according to the restful conventions and added the missing endpoints. The controllers like `FollowAndUnfollowUser`, `BlockAndUnblockUser`, and `LikeAndDislikePost` will handle the combined actions for better organization and maintainability.
