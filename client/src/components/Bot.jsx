import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation
import Chatbot from "./chatbot/Chatbot";

const Bot = () => {
  const [showWhatsAppTitle, setShowWhatsAppTitle] = useState(false);
  const [showChatbotTitle, setShowChatbotTitle] = useState(false);

  return (
    <div>
      {/* WhatsApp Floating Button */}
      <div
        className="fixed bottom-16 right-5 z-50"
        onMouseEnter={() => setShowWhatsAppTitle(true)}
        onMouseLeave={() => setShowWhatsAppTitle(false)}
      >
        <Link
          to="https://wa.me/6386144016?text=Hello!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-emerald-500 text-white rounded-full p-2"
        >
          <FaWhatsapp size={26} />
          {/* Display WhatsApp title on hover */}
          {showWhatsAppTitle && (
            <span className="absolute bottom-2 right-12 ml-2 mt-1 text-white bg-emerald-500 text-sm px-2 py-1 rounded">
              व्हाट्सएप
            </span>
          )}
        </Link>
      </div>

      {/* Chatbot Floating Button */}
      <div
        className="fixed bottom-5 right-5 z-50"
        onMouseEnter={() => setShowChatbotTitle(true)}
        onMouseLeave={() => setShowChatbotTitle(false)}
      >
        {/* Replace 'Chatbot' with your Chatbot component */}
        <Chatbot size={26} />
        {/* Display Chatbot title on hover */}
        {showChatbotTitle && (
          <span className="absolute bottom-0 w-[110px] right-12 ml-2 mt-1 text-white bg-emerald-500 text-sm px-2 py-1 rounded">
             अपना प्रश्न पूछें?
          </span>
        )}
      </div>
    </div>
  );
};

export default Bot;

