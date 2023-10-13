import requests
import datetime

url = "https://news.treeofalpha.com/api/news?limit=10"
response = requests.get(url)
response = response.json()
result = []
for i in response:
    try:

        time = i["time"]
        time = datetime.datetime.fromtimestamp(time/1000.0)
        time = time.strftime("%d/%m %H:%M")
        print(time)
    
    except:
        pass