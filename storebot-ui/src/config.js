// src/config.js
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";


//when deploying on render set an environment variable where REACT_APP_API_URL = link to the backend
// REACT_APP_API_URL = https://tokotalk-backend.onrender.com
