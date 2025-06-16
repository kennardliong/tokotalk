# 🛍️ Tokotalk

**Tokotalk** is a full-stack chatbot platform that helps Indonesian small businesses create smart, WhatsApp-based storefronts. It allows store owners to upload products, configure their bot’s personality, and start engaging with customers — all from a simple web dashboard.

---

## 🚀 Features

- 🧠 **AI-powered Chatbot** trained to handle Indonesian small business conversations.
- 💬 **WhatsApp Integration** via Twilio to support real customer interactions.
- 📦 **CSV Product Uploading** to populate the store’s inventory quickly.
- 🛠️ **Bot Configuration Panel** to personalize tone, message style, emojis, and response templates.
- 🧾 **Memory + Chat History** stored per `store_id` in MongoDB.
- 🔐 **Login System** to authenticate users via email.
- 🧭 **Persistent Dashboard** loads store config and history on login.

---

## 🧰 Tech Stack

### Frontend (React + Tailwind)
- `React` (via Create React App)
- `React Router DOM`
- `TailwindCSS`

### Backend (Flask + MongoDB)
- `Flask`
- `Flask-CORS`
- `pymongo`
- `python-dotenv`

### Others
- `Meta Developer API` for WhatsApp messaging
- `MongoDB Atlas` for remote NoSQL storage

---



## 🔧 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/kennardliong/tokotalk.git
cd tokotalk

### 2. Set Up the Backend (Flask)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Create a .env file in backend/:
MONGO_URI=your_mongo_uri
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_ACCOUNT_SID=your_account_sid
WHATSAPP_PHONE_NUMBER=whatsapp:+1415xxxxxxx

Then run the Flask backend:
python app.py

### 3. Set Up the Frontend (React)

cd ../storebot-ui
npm install
npm start

---

📦 Backend Python Dependencies
Your requirements.txt:

Flask
Flask-CORS
pymongo
python-dotenv

Install them with:
pip install -r requirements.txt

Frontend NPM Modules
From storebot-ui/package.json:

"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "react-scripts": "latest",
  "tailwindcss": "^3.0.0"
}

Install with:
npm install

---

🛣️ Roadmap
 Login & dashboard system ✅

 CSV-based product upload ✅

 Configurable bot personality ✅

 Meta + WhatsApp integration ✅

 Chat history visualization

 Product recommendation engine

 Admin panel for analytics

📝 License
MIT License

📬 Contact
Built by @kennardliong.
Feel free to DM for questions, collaboration, or memes.
