from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # load your .env file

# MONGODB_URI = "mongodb+srv://tokotalk-bot:liong0506@tokotalk-cluster.toh76ct.mongodb.net/?retryWrites=true&w=majority&appName=tokotalk-cluster"
uri = "mongodb+srv://tokotalk-bot:liong0506@tokotalk-cluster.toh76ct.mongodb.net/?appName=tokotalk-cluster"

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
