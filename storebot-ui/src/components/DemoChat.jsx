import React, { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "../config";

export default function DemoChat({ products }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const storeId = localStorage.getItem("storeId");
  const senderId = useRef(`web_${storeId}_${Date.now()}`).current;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: chatHistory,
          store_id: storeId,
          sender_id: senderId,
        //   products,        // ✅ newly fetched products
        }),
      });

      const data = await res.json();
      setChatHistory(data.history);
      const botMsg = { sender: "bot", text: data.reply || "No response." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error." },
      ]);
    }
  };

  return (
    <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-4">
      <div className="h-[720px] overflow-y-scroll border p-2 mb-4 rounded"
      
        style={{
            backgroundImage: `url('/chatbg.png')`,
            backgroundSize: 'cover',
        }}
      >
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
                  ? "bg-white text-black"
                  : "bg-sky-400 text-white"
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
          className="bg-sky-400 text-white px-4 py-2 rounded-r"
          onClick={sendMessage}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
