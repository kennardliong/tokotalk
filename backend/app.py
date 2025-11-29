from flask import Flask, request, jsonify
from bot_logic import get_bot_reply
from flask_cors import CORS
import pandas as pd
from langdetect import detect
import requests
from dotenv import load_dotenv
import os
import requests
from bson import ObjectId
from utils import log_error, error_response, send_email_notification
from uuid import uuid4
from datetime import datetime
from db import db
from db_ops import (
    load_store_config,
    save_store_config,
    log_message,
    save_products,
    get_products,
    upsert_user,
    get_chat_history,
    save_waitlist_entry
)

#default settings
store_config = {
    "store_name": "Toko Mentari",
    "bot_identity": "Tok",
    "payment_methods": ["QRIS", "GoPay", "Transfer"],
    "shipping_methods": ["Gojek", "SiCepat"],
    "suggest_related": True,
    "use_emojis": False,
    "use_stickers": False,
    "message_length": "short",
    "personality": "casual",
    "extra_info": ""
}

#similar languages to indo - revert to indo when this happens
SIMILAR_LANGS = {"ms", "tl", "jv", "su", "fi"}

load_dotenv()

WHATSAPP_API_URL = os.getenv("WHATSAPP_API_URL")
# ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
VERIFY_TOKEN = os.getenv("VERIFY_TOKEN")

ACCESS_TOKEN = "EAAPKXJP7ak4BO7ZBC0JgRNYLtLTXeFZAjawemYlpfCCzchkZCU1Sck9l6bS4Owpra3d5AHKhT6rV2bvtqXgbi7NisGODp0eqKqDLwDuZBRNPI74zqX9LjqsrRC2tfDAsY3akQaMMpO5RicCbCwzp3bofcgdsZBzasZBvHyK9oGgJVqGghaEe6aamt9CI8JxZC3o8wZDZD"

app = Flask(__name__)
CORS(app)


def send_whatsapp_message(recipient_id, message_text):
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": recipient_id,
        "type": "text",
        "text": {
            "body": message_text
        }
    }

    try:
        response = requests.post(WHATSAPP_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        print("WhatsApp API success:", response.status_code)

    except requests.exceptions.RequestException as e:
        log_error("send_whatsapp_message", e)


def process_user_message(sender_id, user_input, store_id, history, products=None):
    if not user_input:
        return {"error": "No message provided"}, 400

    if products is None:
        products = []

    if history is None:
        history = [{"role": msg["role"], "content": msg["content"]} for msg in get_chat_history(sender_id)]

    history.append({"role": "user", "content": user_input})
    trimmed_history = history[-10:]

    # Load config from DB or fallback
    config = load_store_config(store_id) or store_config

    # Upsert user and log message
    upsert_user(sender_id, store_id)
    log_message(sender_id, "user", user_input, store_id)

    user_text = user_input.strip().lower()
    short_greeting = user_text in {"halo", "hello", "hallo"} or len(user_text) < 5

    if short_greeting:
        lang = "id"
    else:
        try:
            lang = detect(user_input)
            if lang in SIMILAR_LANGS:
                lang = "id"
        except:
            lang = "id"

    reply = get_bot_reply(
        user_input,
        config,
        language=lang,
        history=trimmed_history,
        products=products  # ✅ THIS IS MANDATORY
    )

    history.append({"role": "bot", "content": reply})

    log_message(sender_id, "bot", reply, store_id)
    print(f"[🧪] Received {len(products)} products in process_user_message")

    return {"reply": reply, "history": history, "language": lang}


@app.route("/")
def home():
    return "Toko Mentari Bot is running!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return error_response("Email is required", 400)

    user = db.users.find_one({"metadata.email": email})
    if not user:
        return error_response("User not found", 404)

    store_id = user.get("metadata", {}).get("store_id")
    if not store_id:
        return error_response("No store assigned", 400)

    return {"store_id": store_id}, 200


@app.route("/register-store", methods=["POST"])
def register_store():
    try:
        data = request.json
        store_name = data.get("store_name")
        owner_phone = data.get("owner_phone")
        owner_email = data.get("owner_email", "")

        if not store_name or not owner_phone:
            return error_response("Store name and phone are required.", 400)

        store_id = f"store_{uuid4().hex[:8]}"

        default_config = {
            "store_id": store_id,
            "store_name": store_name,
            "bot_identity": "Tok",
            "payment_methods": ["QRIS", "GoPay", "Transfer"],
            "shipping_methods": ["Gojek", "SiCepat"],
            "suggest_related": False,
            "use_emojis": False,
            "use_stickers": False,
            "message_length": "short",
            "personality": "casual",
        }

        save_store_config(store_id, default_config)
        upsert_user(owner_phone, {"store_id": store_id, "email": owner_email})

        return {"message": "Store registered successfully!", "store_id": store_id}, 200

    except Exception as e:
        log_error("/register-store", e)
        return error_response("Failed to register store.")


@app.route("/join-waitlist", methods=["POST"])
def join_waitlist():
    try:
        data = request.get_json() or {}
        name = data.get("name")
        email = data.get("email")
        store_name = data.get("store_name")
        store_size = data.get("store_size", "")
        phone = data.get("phone", "")
        notes = data.get("notes", "")

        if not all([name, email, store_name]):
            return error_response("Name, email, and store name are required.", 400)

        entry = {
            "name": name,
            "email": email,
            "store_name": store_name,
            "store_size": store_size,
            "phone": phone,
            "notes": notes,
            "source": data.get("source", "landing_page"),
            "created_at": datetime.utcnow()
        }

        save_waitlist_entry(entry)

        subject = f"[Tokotalk] New waitlist signup - {name}"
        body = (
            f"A new merchant just joined the waitlist.\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Store: {store_name}\n"
            f"Store size: {store_size or '-'}\n"
            f"Phone: {phone or '-'}\n"
            f"Notes: {notes or '-'}\n"
        )
        send_email_notification(subject, body)

        return {"message": "Thanks for joining the waitlist!"}, 200
    except Exception as e:
        log_error("/join-waitlist", e)
        return error_response("Failed to join waitlist.")


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")
        sender_id = data.get("sender_id", "web_demo")  # fallback default
        store_id = data.get("store_id")
        history = data.get("history", [])

        products_doc = db.products.find_one({"store_id": store_id})
        products = products_doc.get("products", []) if products_doc else []

        result = process_user_message(sender_id, user_input, store_id, history, products)
        return jsonify(result)
    except Exception as e:
        log_error("/chat", e)
        return error_response("Chat processing failed.")

@app.route("/webhook", methods=["GET"])
def verify():
    # Webhook verification with Meta
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    if mode == "subscribe" and token == VERIFY_TOKEN:
        print("WEBHOOK_VERIFIED")
        return challenge, 200
    else:
        return "Verification failed", 403


@app.route("/webhook", methods=["POST"])
def receive_message():
    data = request.get_json()
    print("Incoming webhook data:", data)

    try:
        entry = data["entry"][0]
        changes = entry["changes"][0]
        value = changes["value"]
        messages = value.get("messages")
        
        if not messages:
            return "No messages", 200  # e.g., delivery/read receipts

        message = messages[0]
        sender = message["from"]  # e.g., "6281234567890"
        text = message["text"]["body"]

        print(f"📥 Received from {sender}: {text}")

        # 🧠 Try to get store_id from user DB
        user = db.users.find_one({"user_id": sender})
        if not user:
            store_id = "store_mentari"
            upsert_user(sender, {"origin": "whatsapp", "store_id": store_id})
        else:
            store_id = user["metadata"].get("store_id", "store_mentari")

        history = get_chat_history(sender)
        products = get_products(store_id)

        result = process_user_message(sender, text, store_id, history, products)
        reply_text = result["reply"]
        send_whatsapp_message(sender, reply_text)

    except Exception as e:
        print("❌ Error processing webhook:", e)

    return "OK", 200




@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    # data = request.get_json()

    if 'file' not in request.files:
        return error_response("No file uploaded", 400)

    file = request.files['file']
    if not file.filename.endswith('.csv'):
        return error_response("File must be a CSV", 400)

    try:
        store_id = request.form.get("store_id")
        if not store_id:
            return error_response("Missing store_id", 400)

        df = pd.read_csv(file)
        product_list = df.to_dict(orient='records')

        print("📥 store_id:", store_id)
        print("📦 product_list:", product_list)
        save_products(store_id, product_list)

        # df.to_csv('products.csv', index=False)  # Overwrite old file - the default is products.csv
        return {'message': 'CSV uploaded and stored to DB successfully'}, 200
    except Exception as e:
        log_error("/upload-csv", e)
        return error_response("CSV upload failed.")

@app.route('/update-config', methods=['POST'])
def update_config():
    data = request.get_json()
    store_id = data.get("store_id")
    config = data.get("config")
    save_store_config(store_id, config)
    print("config: ",config)
    return {'message': 'Config saved to DB'}, 200

@app.route('/get-config', methods=['GET'])
def get_config():
    store_id = request.args.get("store_id", "store_mentari")
    config = load_store_config(store_id) or store_config
    return jsonify(config)

@app.route('/get-products', methods=['GET'])
def get_products_route():
    try:
        store_id = request.args.get("store_id", "store_mentari")
        cursor = db.products.find({"store_id": store_id})

        products = []
        for doc in cursor:
            doc.pop("_id", None)
            products.append(doc)

        return jsonify({"products": products})
    except Exception as e:
        log_error("/get-products", e)
        return error_response("Failed to retrieve products.", 500)


if __name__ == "__main__":
    app.run(debug=True)
