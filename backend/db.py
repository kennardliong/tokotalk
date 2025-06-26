from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # load your .env file

client = MongoClient(os.environ["MONGODB_URI"])
db = client["tokotalk-bot"]


store_configs = db["store_configs"]
messages = db["messages"]
products = db["products"]
users = db["users"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
