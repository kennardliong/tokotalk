import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // 👈 add this

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("storeId", data.store_id); // Save session info
        localStorage.setItem("email", email);
        onLogin(data.store_id); // optional: still call if you use it elsewhere
        navigate("/dashboard"); // 👈 go to dashboard after login
      } else {
        setStatus("❌ " + (data.error || "Login failed"));
      }
    } catch (err) {
      setStatus("❌ Network error");
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-2">Login</h2>
      <input
        type="email"
        required
        className="w-full mb-2 border px-2 py-1 rounded"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}
