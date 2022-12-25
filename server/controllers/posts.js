import Post from "../models/Post.js";
import User from "../models/User.js";

/* Create */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = newPost({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    // save to Back End
    await newPost.save();
    // grapping all the posts
    const post = await Post.find();
    // send to Front End
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* Read */
// This will be the News Feed
export const getFeedPosts = async (req, res) => {
  try {
    // grapping all the posts
    const post = await Post.find();
    // send to Front End
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    // grapping all the posts
    const post = await Post.find({ userId });
    // send to Front End
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Update */
export const likePost = async (req, res) => {
  try {
    // grabbing id from "url"
    const { id } = req.params;
    // grabbing userId from Front End
    const { userId } = req.body;
    // grabbing post info
    const post = await Post.findById(id);
    // if the "userId" exists, the post has been "liked"
    const isLiked = post.likes.get(userId);

    // like and dislike logic
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // depending if "isLiked" exists, we will be gather that info and send it to the Front End in this variable named "updatedPost"
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // send to Front End
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
