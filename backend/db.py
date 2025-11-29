from pymongo import MongoClient
import os
from dotenv import load_dotenv

uri = os.getenv("MONGODB_URI")
if not uri:
    raise RuntimeError("MONGODB_URI is not set in the environment.")

client = MongoClient(uri)
db = client["tokotalk-bot"]


store_configs = db["store_configs"]
messages = db["messages"]
products = db["products"]
users = db["users"]
waitlist = db["waitlist"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
