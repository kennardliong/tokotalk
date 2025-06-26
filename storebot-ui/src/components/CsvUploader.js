import { useState } from "react";

export default function CsvUploader({ onUploadSuccess, products }) {
  console.log("🧾 Products received by CsvUploader:", products);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const storeId = localStorage.getItem("storeId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("store_id", storeId);

    try {
      const res = await fetch("http://localhost:5000/upload-csv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Upload successful!");
        onUploadSuccess?.();
      } else {
        setMessage("❌ Error: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl">
      <h2 className="text-lg font-bold mb-4">Upload Your Product List (CSV)</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload
        </button>
        
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      {/* Products Table */}
      {products && products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price (Rp)</th>
                <th className="px-4 py-2 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium">{p.Product}</td>
                  <td className="px-4 py-2 border">{p.Description}</td>
                  <td className="px-4 py-2 border">{parseInt(p.Price).toLocaleString("id-ID")}</td>
                  <td className="px-4 py-2 border">{p.Stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No products uploaded yet.</p>
      )}
    </div>
  );
}
