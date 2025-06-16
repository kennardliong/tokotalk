// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const storeId = localStorage.getItem("storeId");
  return storeId ? children : <Navigate to="/" replace />;
}
