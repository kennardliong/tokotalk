import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginForm from "./components/LoginForm";
import Dashboard from "././pages/Dashboard"; // This is your existing chatbot UI
import PricingPage from "./pages/Pricing";
import ProductPage from "./pages/ProductPage";

function App() {

  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("storeId");
    if (stored) setStoreId(stored);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm onLogin={setStoreId} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
