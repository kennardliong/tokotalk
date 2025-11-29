import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function RegisterPage() {
  const [storeName, setStoreName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/register-store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_name: storeName,
          owner_phone: ownerPhone,
          owner_email: ownerEmail,
        }),
      });

      const data = await res.json();
      if (res.ok && data.store_id) {
        localStorage.setItem("storeId", data.store_id);
        navigate("/dashboard");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 via-sky-200 to-white">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register Your Store</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <label className="block mb-2">
          <span className="text-gray-700">Store Name</span>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Phone Number</span>
          <input
            type="text"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            required
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
