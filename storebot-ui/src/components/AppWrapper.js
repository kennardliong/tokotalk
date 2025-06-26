import { useState, useEffect } from "react";
export default function AppWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    setVisible(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
