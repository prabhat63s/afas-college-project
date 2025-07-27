import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const EditPostForm = ({
  isOpen,
  onClose,
  postId,
  currentContent,
  onUpdate,
}) => {
  const [content, setContent] = useState(currentContent);
  const [textareaHeight, setTextareaHeight] = useState("150px"); // Initial height

  const handleChange = (event) => {
    setContent(event.target.value);
    setTextareaHeight(`${event.target.scrollHeight}px`); // Set textarea height based on content
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace" && textareaHeight !== "80px") {
        const lines = content.split("\n").length;
        setTextareaHeight(`${80 + (lines - 1) * 20}px`);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [textareaHeight, content]);

  const handleUpdatePost = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`,
        {
          content,
        }
      );
      onUpdate(response.data); // Update post in parent component
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Post Modal"
      className="w-full flex items-center justify-center h-screen bg-white"
    >
      <div className="w-[400px] rounded-md p-5 border shadow-lg">
        <h2 className="font-medium pb-4 text-lg">Edit Post</h2>
        <textarea
          value={content}
          onChange={handleChange}
          style={{ height: textareaHeight }}
          rows={10}
          className="block w-full rounded-md border-0 p-2 shadow-sm bg-gray-50 resize-none placeholder:text-gray-800"
        />
        <div className=" flex gap-5 mt-5">
          <button
            onClick={handleUpdatePost}
            className="w-full text-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm shadow-sm  font-semibold text-white hover:bg-emerald-400"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="w-full text-center rounded-md border border-emerald-500 px-3.5 py-2.5 text-sm shadow-sm  font-semibold hover:text-white hover:bg-emerald-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPostForm;
