import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Notification from "./Notification";
import { useAuth } from "../context/auth";
import axios from "axios";
import { BiSolidMicrophone } from "react-icons/bi";

const SpeechRecognitionComponent = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();

  const handleAddPost = async (transcript) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/posts`, {
        title: auth?.user?.name || "अपनी फसल अपनी सुरक्षा",
        content: transcript,
      });
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    language: "hi-IN", // Specify Hindi (India) language
  });

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      setShowNotification(true);
      SpeechRecognition.startListening({ language: "hi-IN" });
    } else {
      console.error("Speech recognition is not supported by your browser.");
    }
  };

  const stopListening = () => {
    setShowNotification(false);
    SpeechRecognition.stopListening();
  };

  const handleListen = () => {
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const handleAddPostClick = () => {
    handleAddPost(transcript);
    window.location.reload();
  };

  return (
    <div className="">
      <div className="w-full flex flex-col items-center justify-center">
        <button
          onClick={handleListen}
          className="hover:bg-gray-200 rounded-full p-2 "
        >
            <BiSolidMicrophone size={24} />
        </button>
        <p className="w-full text-start">मैसेज: </p>
        <p className="w-full text-start p-4 bg-white rounded-md">{transcript}</p>
      </div>
      <div className="pt-5 flex gap-4">
        <button
          onClick={handleAddPostClick}
          className="text-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm shadow-sm font-semibold text-white hover:bg-emerald-400"
        >
         पोस्ट जोड़ें
        </button>
        <button
          onClick={resetTranscript}
          className="text-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm shadow-sm font-semibold text-white hover:bg-emerald-400"
        >
          रीसेट करें
        </button>
      </div>
      {listening && (
        <Notification show={showNotification} />
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;
