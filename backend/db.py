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

print(db.list_collection_names())

