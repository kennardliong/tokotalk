import { useEffect, useState } from "react";

const defaultConfig = {
  store_name: "bro Mentari",
  bot_identity: "Tok",
  payment_methods: ["QRIS", "GoPay", "Transfer"],
  shipping_methods: ["Gojek", "SiCepat"],
  suggest_related: true,
  personality: "casual",
  message_length: "short",
  use_emojis: false,
  use_stickers: false,
};

const toneOptions = ["friendly", "casual", "professional"];

export default function StoreConfigPanel() {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState("");
  const storeId = localStorage.getItem("storeId");

  // Load config on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`http://localhost:5000/get-config?store_id=${storeId}`);
        const data = await res.json();
        console.log("Fetched config:", data);
        if (data) {
          setConfig(data);
        } else {
          setConfig(defaultConfig);
          console.log("error")
        }
      } catch (err) {
        console.error("Failed to fetch config:", err);
        setConfig(defaultConfig);
      }
    };

    if (storeId) {
      fetchConfig();
    } else {
      console.warn("No store_id found in localStorage");
      setConfig(defaultConfig);
    }
  }, [storeId]);

  const toneIndex = config ? toneOptions.indexOf(config.personality) : 0;

  const handleToneChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    setConfig({ ...config, personality: toneOptions[idx] });
  };

  const handleListCheckbox = (field, value) => {
    const list = config[field];
    const updated = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
    setConfig({ ...config, [field]: updated });
  };

  const updateConfig = async () => {
    try {
      const res = await fetch("http://localhost:5000/update-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_id: storeId,
          config: config,
        }),
      });

      const data = await res.json();
      setStatus(data.message || "Updated!");
    } catch (err) {
      console.error("Failed to update config:", err);
      setStatus("Error updating config");
    }

    setTimeout(() => setStatus(""), 2000);
  };

  if (!config) return <div className="text-gray-500">Loading store config...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Store Settings</h2>

      <label className="block mb-2">
        <span className="text-sm">Store Name</span>
        <input
          type="text"
          className="mt-1 w-full border rounded px-2 py-1"
          value={config.store_name}
          onChange={(e) => setConfig({ ...config, store_name: e.target.value })}
        />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Bot Identity</span>
        <input
          type="text"
          className="mt-1 w-full border rounded px-2 py-1"
          value={config.bot_identity}
          onChange={(e) => setConfig({ ...config, bot_identity: e.target.value })}
        />
      </label>

      {/* Tone / Personality slider */}
      <div className="mb-4">
        <span className="text-sm block mb-1">Tone</span>
        <input
          type="range"
          min="0"
          max={toneOptions.length - 1}
          step="1"
          value={toneIndex}
          onChange={handleToneChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs mt-1 px-1 select-none text-gray-600 font-medium">
          {toneOptions.map((tone) => (
            <span key={tone}>{tone}</span>
          ))}
        </div>
        <div className="mt-1 text-sm font-semibold text-blue-600">
          Selected: {config.personality}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-sm">Response Length</span>
        <select
          className="mt-1 w-full border rounded px-2 py-1"
          value={config.message_length}
          onChange={(e) => setConfig({ ...config, message_length: e.target.value })}
        >
          <option value="short">Short (1 sentence)</option>
          <option value="medium">Medium (few sentences)</option>
          <option value="long">Long (paragraph)</option>
        </select>
      </div>

      <div className="mb-2">
        <span className="text-sm">Payment Methods</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {["GoPay", "OVO", "DANA", "QRIS", "Transfer"].map((method) => (
            <label
              key={method}
              className={`px-2 py-1 rounded cursor-pointer border ${
                config.payment_methods.includes(method)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleListCheckbox("payment_methods", method)}
            >
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-sm">Shipping Methods</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {["Wahana", "AnterAja", "SiCepat", "Gojek", "JNE", "Tiki", "Grab"].map((method) => (
            <label
              key={method}
              className={`px-2 py-1 rounded cursor-pointer border ${
                config.shipping_methods.includes(method)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleListCheckbox("shipping_methods", method)}
            >
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={config.use_emojis}
            onChange={(e) => setConfig({ ...config, use_emojis: e.target.checked })}
          />
          Use Emojis
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={config.use_stickers}
            onChange={(e) => setConfig({ ...config, use_stickers: e.target.checked })}
          />
          Use Stickers
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={config.suggest_related}
            onChange={(e) => setConfig({ ...config, suggest_related: e.target.checked })}
          />
          Suggest Related
        </label>
      </div>

      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={updateConfig}
      >
        Save Settings
      </button>

      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
