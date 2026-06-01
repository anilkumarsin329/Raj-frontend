// src/components/Chatbot.js
import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to CateringHub! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setTyping(true);

    // Auto reply with typing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "✅ Thank you for your query! Our team will contact you shortly." },
      ]);
      setTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-10 left-6 bg-green-600 hover:bg-green-700 
                   text-white p-4 rounded-full shadow-xl z-50 transition 
                   transform hover:scale-110"
      >
        <FaComments size={22} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-28 left-6 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="bg-amber-600 text-white px-4 py-2 font-semibold flex justify-between items-center">
            <span>CateringHub Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-green-600 text-white ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="p-2 bg-gray-200 rounded-lg w-16 text-xs text-gray-600">
                Typing...
              </div>
            )}
          </div>
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 bg-green-600 hover:bg-green-700 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
