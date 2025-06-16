// src/pages/Dashboard.jsx
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CsvUploader from "../components/CsvUploader";
import StoreConfigPanel from "../components/StoreConfigPanel";

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const storeId = localStorage.getItem("storeId");
  const senderId = useRef(`web_${storeId}_${Date.now()}`).current;

  const navigate = useNavigate();

  useEffect(() => {
    if (!storeId) {
      navigate("/login");
    }
  }, [storeId, navigate]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: chatHistory, store_id: storeId, sender_id: senderId}),
      });
      const data = await res.json();
      setChatHistory(data.history);
      const botMsg = { sender: "bot", text: data.reply || "No response." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error!" }]);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
    <div className="w-full bg-white shadow p-3 mb-6 flex justify-between items-center max-w-5xl rounded">
      <h1 className="text-lg font-semibold text-gray-800">🛍️ Tokotalk Dashboard</h1>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
      <CsvUploader />
      <StoreConfigPanel />

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <div className="h-80 overflow-y-scroll border p-2 mb-4 rounded">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
            placeholder="Ketik pesan di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
            onClick={sendMessage}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
