import express from "express";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";

import bodyParser from "body-parser";
const router = express.Router();
// Use body-parser middleware
router.use(bodyParser.json());
// Create a new post
router.post("/",requireSignIn,  async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
router.get("/", requireSignIn, async (req, res) => {
  try {
    const posts = await Post.find().populate("comments");
    console.log(posts)
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put("/:postId", requireSignIn, async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a post
router.delete("/:postId", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { postId } = req.params;
    // Delete post and associated comments
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ postId });
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a post
router.post("/:postId/comments", requireSignIn,  async (req, res) => {
  try {
    const { postId } = req.params;
    const { text ,email} = req.body;
    console.log(postId,email,text)
    const newComment = await Comment.create({ text, postId });
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");
    await userModel.findOneAndUpdate(
      {email},
      { $push: { comment: newComment._id } },
      { new: true }
    );
    console.log(post)
    res.status(201).json(post);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/:postId/comments/:commentId",requireSignIn,  async (req, res) => {
  
  try {
    const { postId, commentId } = req.params;
    const { email } = req.body;

    console.log("postId--->", postId);
    console.log("email--->", email);
    console.log("commentId-->", commentId);

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the comment exists in the user's comments array
    const commentExistsInUser = user.comment.some(comment => comment.equals(commentId));
    if (!commentExistsInUser) {
      return res.status(404).json({ message: "Comment not found in user's comments" });
    }

    // Find the post and check if the comment exists in the post's comments array
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const commentExistsInPost = post.comments.some(comment => comment.equals(commentId));
    if (!commentExistsInPost) {
      return res.status(404).json({ message: "Comment not found in post's comments" });
    }

    // Delete the comment from the Comment collection
    await Comment.findByIdAndDelete(commentId);

    // Update the post to remove the comment
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }, { new: true });

    // Update the user to remove the comment
    await userModel.findOneAndUpdate({ email }, { $pull: { comment: commentId } }, { new: true });

    res.status(204).send(); // No content response
   } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a post
router.post("/:postId/like", requireSignIn, async (req, res) => {
  
  try {
    const { postId } = req.params;
    const { email } = req.body;

    // Find the user by email and populate the 'like' field
    const user = await userModel.findOne({ email }).populate('like');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post by postId
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post is already liked by the user
    const isLiked = user.like.some(likedPost => likedPost._id.equals(postId));

    if (isLiked) {
      // If liked, decrement the likes and remove from user's liked posts
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        user._id,
        { $pull: { like: postId } },
        { new: true }
      );
    } else {
      // If not liked, increment the likes and add to user's liked posts
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        user._id,
        { $push: { like: postId } },
        { new: true }
      );
    }

    // Fetch the updated post to return the latest likes count
    post = await Post.findById(postId);
    res.json(post);

  } catch (error) {
    // Handle any errors that occur during the operation
    console.error(error);
    res.status(500).json({ message: error.message });
  }

});

// Dislike a post
router.post("/:postId/dislike",requireSignIn,  async (req, res) => {
  try {
    const { postId } = req.params;
    const { email } = req.body;

    // Find the user by email and populate the 'like' field
    const user = await userModel.findOne({ email }).populate('dislike');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post by postId
    let post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post is already disliked by the user
    const isdisLiked = user.dislike.some(dislikedPost => dislikedPost._id.equals(postId));

    if (isdisLiked) {
      // If  disliked, decrement the dislikes and remove from user's disliked posts
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { dislikes: -1 } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        user._id,
        { $pull: { dislike: postId } },
        { new: true }
      );
    } else {
      // If not disliked, increment the dislikes and add to user's disliked posts
      await Post.findByIdAndUpdate(
        postId,
        { $inc: { dislikes: 1 } },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        user._id,
        { $push: { dislike: postId } },
        { new: true }
      );
    }

    // Fetch the updated post to return the latest likes count
    post = await Post.findById(postId);
    res.json(post);
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: error.message });
  }
});

export default router;
