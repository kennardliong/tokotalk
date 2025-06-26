// ProductPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { WhatsappIcon, InstagramIcon, MessengerIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import AppWrapper from "../components/AppWrapper";

function ChatBubble({ user, text }) {
  const isBot = user === "Bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs text-sm ${isBot ? "bg-gray-100 text-gray-800" : "bg-sky-400 text-white"}`}>
        {text}
      </div>
    </div>
  );
}

export default function ProductPage() {

  const toneOptions = ["friendly", "casual", "professional"];

  const [storeName, setStoreName] = useState("Toko Mentari");
  const [botIdentity, setBotIdentity] = useState("Tok");
  const [toneIndex, setToneIndex] = useState(1);
  const [messageLength, setMessageLength] = useState("medium");
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleItem = (type, value) => {
    const update = (prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];

    if (type === "payment") {
      setSelectedPayments(update);
    } else {
      setSelectedShipping(update);
    }
  };

  return (
    <AppWrapper>
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="w-full bg-white shadow p-3 flex justify-between items-center px-6">
        <Link to="/">
          <img src="/tokotalk-textlogo.png" alt="Tokotalk Logo" className="h-12" />
        </Link>
        <div className="flex gap-4 text-sm">
          <Link to="/product" className="text-sky-400 hover:underline">Product</Link>
          <Link to="/pricing" className="text-sky-400 hover:underline">Pricing</Link>
          <Link to="/register" className="text-sky-400 hover:underline">Register</Link>
          <Link to="/login" className="text-sky-400 hover:underline">Login</Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 text-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-sky-200 to-sky-100">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Customize Your Tokotalk Bot</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Whether you're a seasoned seller or just starting out, Tokotalk lets you automate sales with a chatbot that's truly yours.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-20">

          {/* Step 1: Initialize */}
          <StepCard step="01" title="Initialize Your Store" aos="fade-up">
            <p className="text-sm text-gray-600 mb-3">Give your store and bot a name. These appear in greetings and replies.</p>
            <label className="text-sm block mb-1">Store Name</label>
            <input type="text" className="mb-2 w-full border rounded px-2 py-1" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            <label className="text-sm block mb-1">Bot Identity</label>
            <input type="text" className="w-full border rounded px-2 py-1" value={botIdentity} onChange={(e) => setBotIdentity(e.target.value)} />
          </StepCard>

          {/* Step 2: Personalize */}
          <StepCard step="02" title="Set the Tone" aos="fade-up">
            <p className="text-sm text-gray-600 mb-4">From corporate professional to family business manager - customize your bot's personality.</p>
            <label className="text-sm block mb-1">Tone</label>
            <input
              type="range"
              min="0"
              max={toneOptions.length - 1}
              step="1"
              value={toneIndex}
              onChange={(e) => setToneIndex(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-600 font-medium px-1">
              {toneOptions.map((tone) => <span key={tone}>{tone}</span>)}
            </div>
            <div className="mt-1 text-sm font-semibold text-sky-400">Selected: {toneOptions[toneIndex]}</div>

            <label className="text-sm block mt-4">Response Style</label>
            <select
              className="mt-1 w-full border rounded px-2 py-1"
              value={messageLength}
              onChange={(e) => setMessageLength(e.target.value)}
            >
            <option value="short">Concise: quick, succinct responses (1 sentence)</option>
            <option value="medium">Balanced: moderate, descriptive responses  (2-4 sentences)</option>
            <option value="long">Detailed: engaging, thorough responses (paragraph)</option>
            </select>
          </StepCard>

          {/* Step 3: Final Touches */}
          <StepCard step="03" title="Final Touches" aos="fade-up">
            <p className="text-sm text-gray-600 mb-4">Choose how your bot handles checkout and delivery.</p>

            <h4 className="text-xs font-medium uppercase text-gray-500 mb-2 mt-4 text-center">Payment Options</h4>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {["GoPay", "OVO", "DANA", "QRIS", "Transfer"].map((method) => (
                <button
                  key={method}
                  onClick={() => toggleItem("payment", method)}
                  className={`px-4 py-1 rounded-full text-sm border shadow-sm transition ${
                    selectedPayments.includes(method)
                      ? "bg-sky-400 text-white border-sky-400"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <h4 className="text-xs font-medium uppercase text-gray-500 mb-2 mt-4 text-center">Shipping Methods</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {["Wahana", "AnterAja", "SiCepat", "Gojek", "JNE", "Tiki", "Grab"].map((method) => (
                <button
                  key={method}
                  onClick={() => toggleItem("shipping", method)}
                  className={`px-4 py-1 rounded-full text-sm border shadow-sm transition ${
                    selectedShipping.includes(method)
                      ? "bg-sky-400 text-white border-sky-400"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </StepCard>

          {/* Step 4: Demo */}
          <StepCard step="04" title="Test It Out" aos="fade-up">
            <p className="text-sm text-gray-600 mb-4">Try chatting with your bot in a sample conversation.</p>
            <div className="max-w-md mx-auto space-y-3">
              <ChatBubble user="Customer" text="Halo, ada tas kulit warna coklat?" />
              <ChatBubble user="Bot" text="Hai kak! Ada ya, stoknya masih 3. Mau langsung order?" />
              <ChatBubble user="Customer" text="Harganya agak mahal 😔" />
              <ChatBubble user="Bot" text="Kalau mau yang lebih terjangkau, kami juga punya tas kanvas, masih sama stylish-nya!" />
            </div>
          </StepCard>

          {/* Step 5: Deploy */}
          <StepCard step="05" title="Deploy Anywhere" aos="fade-up">
            <p className="text-sm text-gray-600 mb-4">Deploy your bot across popular platforms.</p>
            <div className="flex justify-center gap-6 items-center mt-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border text-sm">
                <HugeiconsIcon icon={WhatsappIcon} /> WhatsApp
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border text-sm">
                <HugeiconsIcon icon={InstagramIcon} /> Instagram
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border text-sm">
                <HugeiconsIcon icon={MessengerIcon} /> Messenger
              </div>
            </div>
          </StepCard>
        </div>
      </section>

     {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How TokoTalk Compares</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-sm">
              <thead>
                <tr className="bg-sky-300">
                  <th className="p-3 font-semibold">Feature</th>
                  <th className="p-3 font-semibold">TokoTalk</th>
                  <th className="p-3 font-semibold">Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                <tr className = "bg-sky-100">
                  <td className="p-3">No-code Setup</td>
                  <td className="p-3">✅</td>
                  <td className="p-3">❌</td>
                </tr>
                <tr className = "bg-sky-100">
                  <td className="p-3">Multi-Platform Deployment</td>
                  <td className="p-3">✅</td>
                  <td className="p-3">❌</td>
                </tr>
                <tr className = "bg-sky-100">
                  <td className="p-3">Human-sounding Replies</td>
                  <td className="p-3">✅</td>
                  <td className="p-3">❌</td>
                </tr>
                <tr className = "bg-sky-100">
                  <td className="p-3">Simple Personalization</td>
                  <td className="p-3">✅</td>
                  <td className="p-3">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-400 via-white to-white">
        <div className="flex justify-center mb-6">
            <img
              src="/Tokotalk-blue.png"
              alt="TokoTalk Logo"
              className="h-20"
            />
        </div>
        <h3 className="text-2xl font-bold mb-4">Your Store Deserves a Smarter Way to Sell</h3>
        <p className="text-gray-600 mb-6">Try it out for free — or go live in minutes.</p>
        <Link
          to="/register"
          className="bg-sky-400 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-sky-500"
        >
          Register Your Store
        </Link>
      </section>

    </div>
    </AppWrapper>
  );
}

function StepCard({ step, title, children, aos }) {
  return (
    <div data-aos={aos} className="bg-gray-50 rounded-xl shadow-md px-6 py-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-sky-400 text-white text-xs font-bold px-3 py-1 rounded-full">{step}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
    
  );
}
