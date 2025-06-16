# db_ops.py

from db import store_configs, messages, products, users
from datetime import datetime

# Store Configs
def save_store_config(store_id, config):
    store_configs.update_one(
        {"store_id": store_id},
        {"$set": {"config": config}},
        upsert=True
    )

def load_store_config(store_id):
    result = store_configs.find_one({"store_id": store_id})
    return result["config"] if result else None


# Messages
def log_message(sender_id, role, content, store_id=None):
    message = {
        "sender_id": sender_id,
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow()
    }
    
    if store_id:
        message["store_id"] = store_id
    messages.insert_one(message)


# Products
def save_products(store_id, product_list):
    products.delete_many({"store_id": store_id})  # Overwrite
    for product in product_list:
        product["store_id"] = store_id
        products.insert_one(product)

def get_products(store_id):
    return list(products.find({"store_id": store_id}))


# Users
def upsert_user(user_id, metadata=None):
    users.update_one(
        {"user_id": user_id},
        {"$setOnInsert": {"joined": datetime.utcnow()}, "$set": {"metadata": metadata or {}}},
        upsert=True
    )


def get_chat_history(sender_id, limit=10):
    cursor = messages.find({"sender_id": sender_id}).sort("timestamp", -1).limit(limit)
    return list(reversed(cursor))  # Return from oldest to newest