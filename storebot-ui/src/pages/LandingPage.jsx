import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  console.log("LandingPage rendered");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">TokoTalk</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
        Smart WhatsApp storefronts for Indonesian small businesses. Upload products, configure your bot, and start selling instantly.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Register Your Store
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
