import requests
r = requests.post("http://localhost:5000/chat", json={"message": "Ada gelang emas gak?"})
print(r.json())
