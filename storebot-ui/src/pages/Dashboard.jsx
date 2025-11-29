// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CsvUploader from "../components/CsvUploader";
import StoreConfigPanel from "../components/StoreConfigPanel";
import DemoChat from "../components/DemoChat";
import { API_BASE_URL } from "../config";

const TABS = [
  { id: "config", label: "Configuration", icon: "⚙️" },
  { id: "products", label: "Products", icon: "📦" },
  { id: "demo", label: "Demo Chat", icon: "🤖" },
  { id: "integration", label: "WA/IG Plugin", icon: "💬" },
  { id: "messages", label: "Messages", icon: "📥" },
  { id: "analytics", label: "Analytics", icon: "📊" },
];

function Dashboard() {
  const navigate = useNavigate();
  const storeId = localStorage.getItem("storeId");
  // const senderId = useRef(`web_${storeId}_${Date.now()}`).current;

  const [activeTab, setActiveTab] = useState("config");
  const [products, setProducts] = useState([]);

  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState("");
  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    if (!storeId) navigate("/login");
  }, [storeId, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get-products?store_id=${storeId}`);
      const data = await res.json();
      console.log("🛍️ fetched products:", data);

      // NEW: flatten if it's wrapped inside another object
      if (Array.isArray(data.products) && data.products.length > 0 && Array.isArray(data.products[0].products)) {
        setProducts(data.products[0].products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    if (storeId) fetchProducts();
  }, [storeId]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get-config?store_id=${storeId}`);
        const data = await res.json();
        setConfig(data);
        setConfigLoaded(true);
      } catch (err) {
        console.error("Failed to fetch config:", err);
      }
    };
    if (storeId && !configLoaded) fetchConfig();
  }, [storeId, configLoaded]);

  const updateConfig = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/update-config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store_id: storeId, config }),
      });
      const data = await res.json();
      setStatus(data.message || "Updated!");
    } catch (err) {
      console.error("Error updating config:", err);
      setStatus("Failed to update");
    }
    setTimeout(() => setStatus(""), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-lg border-r px-4 py-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center py-6 mb-4">
            <img src="/tokotalk-textlogo.png" alt="TokoTalk Logo" className="h-12" />
          </div>
          <nav className="space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition ${
                  activeTab === tab.id
                    ? "bg-sky-100 text-sky-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md transition bg-red-50 text-red-600 hover:bg-red-100 font-medium"
            >
              🔒 <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {activeTab === "config" && config && (
          <StoreConfigPanel
            config={config}
            setConfig={setConfig}
            updateConfig={updateConfig}
            status={status}
          />
        )}
        {activeTab === "products" && (
          <CsvUploader
            onUploadSuccess={fetchProducts}
            products={products}
          />
        )}
        {activeTab === "demo" && <DemoChat products={products} />}
        {activeTab === "integration" && <p>WhatsApp and Instagram integration coming soon!</p>}
        {activeTab === "messages" && <p>Message Log coming soon!</p>}
        {activeTab === "analytics" && <p>Analytics coming soon!</p>}
      </main>
    </div>
  );
}

export default Dashboard;
