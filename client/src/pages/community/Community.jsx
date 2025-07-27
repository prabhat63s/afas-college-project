import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { MdDelete, MdThumbDown, MdThumbUp } from "react-icons/md";
import { useAuth } from "../../context/auth";
import { BsDot } from "react-icons/bs";
import EditPostForm from "./EditPostForm";
import SpeechRecognitionComponent from "../../components/SpeechRecognitionComponent ";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [auth] = useAuth();
  const email = auth.user.email;
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/posts`
        );
        console.log(response.data);
        console.log(auth);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`
      );
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      console.log(postId, email);

      // Send a POST request to like the post using Axios
      const updateLike = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/like`,
        { email }
      );
      console.log(updateLike.data);
      // Update the local state (posts array) to reflect the increased likes count
      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, likes: updateLike.data.likes } : p
      );
      setPosts(updatedPosts); // Update the state with the new posts array
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const handleDislikePost = async (postId) => {
    try {
      // Send a POST request to dislike the post using Axios
      const updateDisLike = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/dislike`,
        { email }
      );

      // Update the local state (posts array) to reflect the increased dislikes count
      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, dislikes: updateDisLike.data.dislikes } : p
      );
      setPosts(updatedPosts); // Update the state with the new posts array
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleAddComment = async (postId, text) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/comments`,
        { text, email }
      );
      const updatedPosts = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/posts`
      );
      setPosts(updatedPosts.data);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}/comments/${commentId}`,
        {
          data: {
            email,
          },
        }
      );
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          const updatedComments = post.comments.filter(
            (comment) => comment._id !== commentId
          );
          return { ...post, comments: updatedComments };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post._id === updatedPost._id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  const closeEditModal = () => {
    setEditPostId(null);
  };

  return (
    <Layout>
      <div className="w-[100%]">
        {/* our Objective  */}
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl font-semibold text-emerald-500 mb-2">परामर्श</h1>
            <p className="">
              अकेले, हम बहुत कम कर सकते हैं; साथ मिलकर, हम बहुत कुछ कर सकते हैं
            </p>
          </div>
          <div className="w-full flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:w-[40%] h-fit">
              <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md">
                <p className="">{auth?.user.name}</p>
                <SpeechRecognitionComponent />
              </div>
            </div>
            <div className="w-full lg:w-[60%] flex flex-col gap-4">
              {posts.map((post) => (
                <div key={post._id} className="p-5 rounded-md bg-gray-50 ">
                  <div className="flex justify-between items-center pb-2">
                    <h3 className="pb-2">{post.title}</h3>
                    <div className="flex gap-2">
                      {/* Delete Post Button */}
                      {auth?.user?.role === 1 ? (
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="flex gap-2 bg-white rounded-md p-2 items-center hover:text-red-400 text-red-500"
                        >
                          <MdDelete />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <p className="bg-white rounded-md p-4">{post.content}</p>

                  {/* Edit Post Modal */}
                  {editPostId && (
                    <EditPostForm
                      isOpen={true}
                      onClose={closeEditModal}
                      postId={editPostId}
                      currentContent={
                        posts.find((post) => post._id === editPostId)?.content
                      }
                      onUpdate={handleUpdatePost}
                    />
                  )}

                  <div className="flex flex-col lg:flex-row gap-4 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleLikePost(post._id)}
                        className="flex gap-2 bg-white rounded-md px-2 items-center text-emerald-500"
                      >
                        <MdThumbUp /> {post.likes}
                      </button>

                      <button
                        onClick={() => handleDislikePost(post._id)}
                        className="flex gap-2 bg-white rounded-md px-2 items-center text-emerald-500"
                      >
                        <MdThumbDown /> {post.dislikes}
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="टिप्पणी करे"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="block lg:w-fit rounded-md shadow-sm border-0 px-3.5 py-1 placeholder:text-gray-800"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post._id, commentText);
                          setCommentText("");
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (commentText.trim() !== "") {
                          handleAddComment(post._id, commentText);
                          setCommentText("");
                        } else {
                          alert("Please enter a valid comment.");
                        }
                      }}
                      className="text-center rounded-md bg-emerald-500 px-3.5 py-2 lg:py-1 text-sm shadow-sm  font-semibold text-white hover:bg-emerald-400"
                    >
                      जोड़ें
                    </button>
                  </div>

                  <ul className="">
                    {post.comments.map((comment) => (
                      <li
                        key={comment._id}
                        className="bg-white px-2 flex items-center w-fit mb-2 rounded-md"
                      >
                        <BsDot className="text-emerald-500" size={20} />
                        {comment.text}
                        <button
                          onClick={() =>
                            handleDeleteComment(post._id, comment._id)
                          }
                          className="flex gap-2 bg-white rounded-md ml-2 p-2 items-center hover:text-red-400 text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
