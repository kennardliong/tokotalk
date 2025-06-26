// src/components/StoreConfigPanel.jsx
import React from "react";
import {useState} from "react";

const toneOptions = ["friendly", "casual", "professional"];

export default function StoreConfigPanel({ config, setConfig, updateConfig, status }) {
  const [focusedField, setFocusedField] = useState(null);

  const inputRef = React.useRef(null);
  const extraInfoRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [config]);

  if (!config) return <div className="text-gray-500">Loading store config...</div>;

  const handleChange = (field, value) => {
    setConfig({ ...config, [field]: value });
  };

  const handleListCheckbox = (field, value) => {
    const updated = config[field].includes(value)
      ? config[field].filter((v) => v !== value)
      : [...config[field], value];
    handleChange(field, updated);
  };

  const FormRow = ({ label, children }) => (
    <div className="flex items-start justify-between py-4 border-b">
      <label className="w-1/3 text-sm font-medium text-gray-600 pt-2">{label}</label>
      <div className="w-2/3">{children}</div>
    </div>
  );



  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Store Settings</h2>

      <FormRow label="Store Name">
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={config.store_name}
          onChange={(e) => handleChange("store_name", e.target.value)}
          onFocus={() => setFocusedField("store_name")}
          ref={focusedField === "store_name" ? inputRef : null}
        />

      </FormRow>

      <FormRow label="Bot Identity">

        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={config.bot_identity}
          onChange={(e) => handleChange("bot_identity", e.target.value)}
          onFocus={() => setFocusedField("bot_identity")}
          ref={focusedField === "bot_identity" ? inputRef : null}
        />

      </FormRow>

      <FormRow label="Tone">
        <div>
          <input
            type="range"
            min="0"
            max={toneOptions.length - 1}
            value={toneOptions.indexOf(config.personality)}
            onChange={(e) =>
              handleChange("personality", toneOptions[parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-2 text-gray-500 font-medium">
            {toneOptions.map((tone) => (
              <span key={tone}>{tone}</span>
            ))}
          </div>
          <div className="text-sm font-semibold text-blue-600 mt-1">
            Selected: {config.personality}
          </div>
        </div>
      </FormRow>

      <FormRow label="Response Style">
        <select
          className="w-full border rounded px-3 py-2"
          value={config.message_length}
          onChange={(e) => handleChange("message_length", e.target.value)}
        >
          <option value="short">Concise: quick, succinct responses (1 sentence)</option>
          <option value="medium">Balanced: moderate, descriptive responses (2–4 sentences)</option>
          <option value="long">Detailed: engaging, thorough responses (paragraph)</option>
        </select>
      </FormRow>

      <FormRow label="Payment Methods">
        <div className="flex flex-wrap gap-2">
          {["GoPay", "OVO", "DANA", "QRIS", "Transfer"].map((method) => (
            <label
              key={method}
              className={`px-3 py-1 rounded cursor-pointer border text-sm ${
                config.payment_methods.includes(method)
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleListCheckbox("payment_methods", method)}
            >
              {method}
            </label>
          ))}
        </div>
      </FormRow>

      <FormRow label="Shipping Methods">
        <div className="flex flex-wrap gap-2">
          {["Wahana", "AnterAja", "SiCepat", "Gojek", "JNE", "Tiki", "Grab"].map((method) => (
            <label
              key={method}
              className={`px-3 py-1 rounded cursor-pointer border text-sm ${
                config.shipping_methods.includes(method)
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleListCheckbox("shipping_methods", method)}
            >
              {method}
            </label>
          ))}
        </div>
      </FormRow>

      <FormRow label="Preferences">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={config.use_emojis}
              onChange={(e) => handleChange("use_emojis", e.target.checked)}
            />
            Use Emojis
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={config.suggest_related}
              onChange={(e) => handleChange("suggest_related", e.target.checked)}
            />
            Suggest Related
          </label>
        </div>
      </FormRow>

      <FormRow label="Extra Info">

        <textarea
          ref={extraInfoRef}
          rows={3}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. Toko kita dari Jakarta Selatan. Customer kita dipanggil 'bos'. Kita biasanya pake emoji 🙏"
          value={config.extra_info || ""}
          onChange={(e) => {
            // Save cursor position
            const cursorPos = extraInfoRef.current.selectionStart;
            // Update config
            setConfig({ ...config, extra_info: e.target.value });
            // Restore focus and cursor position
            setTimeout(() => {
              if (extraInfoRef.current) {
                extraInfoRef.current.focus();
                extraInfoRef.current.setSelectionRange(cursorPos, cursorPos);
              }
            }, 0);
          }}
        />


      </FormRow>

      <div className="pt-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-sm"
          onClick={updateConfig}
        >
          Save Settings
        </button>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  );
}
