import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";

function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    storeName: "",
    storeSize: "",
    phone: "",
    notes: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          store_name: formData.storeName,
          store_size: formData.storeSize,
          phone: formData.phone,
          notes: formData.notes,
          source: "waitlist_page",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.message || "You're on the waitlist! 🎉");
        setFormData({
          name: "",
          email: "",
          storeName: "",
          storeSize: "",
          phone: "",
          notes: "",
        });
      } else {
        setStatus(data.error || "Failed to join waitlist.");
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <AppWrapper>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 via-sky-100 to-white py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          <div className="flex justify-between items-center px-8 py-5 border-b">
            <Link to="/">
              <img src="/tokotalk-textlogo.png" alt="Tokotalk Logo" className="h-10" />
            </Link>
            <Link to="/register" className="text-sky-500 text-sm font-semibold hover:underline">
              Ready to get started?
            </Link>
          </div>

          <div className="px-8 py-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
                Early Access
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
                Join the TokoTalk Waitlist
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Be the first to know when new integrations launch. Share a bit about your store so we
                can prioritize the right merchants and send onboarding invites as soon as spots open up.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                <InputField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
                <InputField
                  label="Store Name"
                  value={formData.storeName}
                  onChange={(e) => handleChange("storeName", e.target.value)}
                  required
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Store Size
                  </label>
                  <select
                    value={formData.storeSize}
                    onChange={(e) => handleChange("storeSize", e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-sky-200"
                  >
                    <option value="">Select an option</option>
                    <option value="solo">Just me</option>
                    <option value="2-5">2–5 team members</option>
                    <option value="6-20">6–20 team members</option>
                    <option value="20+">More than 20</option>
                  </select>
                </div>
                <InputField
                  label="Phone / WhatsApp"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Anything else we should know?
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Share the type of products you sell, platforms you're active on, or problems you want us to solve."
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-400 text-white py-3 rounded-lg font-semibold text-lg hover:bg-sky-500 transition"
              >
                Join the Waitlist
              </button>

              {status && (
                <p className="text-center text-sm text-gray-600 bg-slate-50 border rounded py-2">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}

function InputField({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-sky-200"
      />
    </div>
  );
}

export default WaitlistPage;
