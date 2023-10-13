import uvicorn
from fastapi import FastAPI
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
import sys, os
import pandas as pd
import numpy as np
from pprint import pprint
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.llms import HuggingFaceHub
from pydantic import BaseModel
import getcsv
import createEmbeddings
from datetime import datetime
from fastapi.responses import FileResponse
import requests
from datetime import datetime
from tvDatafeed import TvDatafeed, Interval
from dotenv import load_dotenv
#cors
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

#enable for all cors

origins = [ 
    "http://localhost:3000",
    "cryptoinsights-six.vercel.app"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

huggingFaceAPiKey = os.getenv('HUGGINGFACEHUB_API_TOKEN')

repoID="mistralai/Mistral-7B-Instruct-v0.1"

llmmodel = HuggingFaceHub(repo_id=repoID, model_kwargs={"max_new_tokens": 250, "temperature": 0.1, "repetition_penalty": 1.33},huggingfacehub_api_token=huggingFaceAPiKey)

template = """You are a cryptocurrency expert chatbot called Eva. You help people gain insights from the universe of cryptocurrencies. Today's Date is {date}. 

Today's Price data:
```
{context}
```

User Query: {question}
Helpful Answer without talking about knowledge or data cutoff:"""

DB_FAISS_PATH = 'vectorstore/db_faiss'

# loader = CSVLoader(file_path='orionterminal.csv', encoding="utf-8", csv_args={'delimiter': ','})
# data = loader.load()

embedding_function = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2', model_kwargs={'device': 'cpu'})
# db = FAISS.load_local(DB_FAISS_PATH, embedding_function)


# db = FAISS.from_documents(data, embedding_function)
# db.save_local(DB_FAISS_PATH)


prompt = PromptTemplate(template=template, input_variables=["context", "question", "date"])

lastUpdateFileName = "lastUpdate.txt"
updateInterval = 24 * 60 * 60 #update every 24 hrs

class Data(BaseModel):
    question: str


def checkCsvUpdate():
    exists = os.path.isfile(lastUpdateFileName)
    # print(exists)

    if exists:
        try:
            with open(lastUpdateFileName, "r") as f:
                lastUpdate = f.read()
            lastUpdate = datetime.strptime(lastUpdate, "%Y-%m-%d %H:%M:%S.%f")
            now = datetime.now()
            diff = now - lastUpdate
            diff = diff.total_seconds()

            if diff > updateInterval:
                updateCsv()
        except FileNotFoundError:
            updateCsv()
    else:
        updateCsv()

    
    

def updateCsv():
    with open(lastUpdateFileName, "w") as f:
        f.write(str(datetime.now()))

    getcsv.getcsv()
    createEmbeddings.createEmbeddings()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/ask")
async def ask(data : Data):
    checkCsvUpdate()
    db = FAISS.load_local(DB_FAISS_PATH, embedding_function)
    chain = ConversationalRetrievalChain.from_llm(llmmodel, retriever=db.as_retriever(), combine_docs_chain_kwargs={'prompt': prompt})
    question = data.question
    response = chain({"question" : question, "chat_history": [], "date": datetime.now().strftime("%Y-%m-%d")})
    answer = response["answer"].strip()
    return {"answer": answer}


@app.get("/api/news")
async def news(limit : int = 100):
    url = "https://news.treeofalpha.com/api/news?limit=500"
    response = requests.get(url)
    response = response.json()
    result = []
    for i in response:
        try:

            coin = i["suggestions"][0]["coin"]
            foldername = "logos/"
            coin = coin.lower()

            imgPath = os.path.join(foldername, coin+".png")
            
            time = i["time"]
            time = datetime.fromtimestamp(time/1000.0)
            time = time.strftime("%d/%m/%Y %H:%M")
            time = str(time)
                
            if i["source"] != "Twitter" and len(result) < limit and os.path.exists(imgPath) and len(i["title"]) < 100:
                    result.append({"title": i["title"],"source": i["source"], "url": i["url"], "coin": coin, "time": time })
        except:
            print("error")
            pass
    return result


@app.get("/api/image")
async def image(coin : str):
    foldername = "logos/"
    coin = coin.lower()

    imgPath = os.path.join(foldername, coin+".png")
    if os.path.exists(imgPath):
        return FileResponse(imgPath)
    else:
        return {"image": "Not Found"}


@app.get("/api/chartdata")
async def chartData(coin: str, limit : int = 100):
    tv = TvDatafeed()
    data = tv.get_hist(symbol=f'{coin}USDT',exchange='BINANCE',interval=Interval.in_4_hour,n_bars=limit)
    return "test"



@app.get("/api/analytics")
async def getanalytics(limit : int = 100):
    url = "https://data.orionterminal.com/api/screener"
    infourl = "https://data.orionterminal.com/api/info"

    res = requests.get(url)
    res = res.json()

    res2 = requests.get(infourl)
    res2 = res2.json()
    info = res2['ALIAS_SCREENER']
    print(info)

    df = pd.DataFrame(res)
    df = df.transpose()
    df = df.reset_index()
    df = df.rename(columns=info)
    df = df.sort_values(by=['marketcap'], ascending=False)
    df = df[~df['index'].str.contains("BUSD")]
    df['index'] = df['index'].str.replace("-binanceusdm", "")

    df = df.drop(columns=["ticks_5m","ticks_15m","ticks_1h","change_5m","change_15m","change_8h", "volume_5m","volume_15m","volume_1h","volume_8h","vdelta_5m","vdelta_15m","vdelta_1h","vdelta_8h", "OI_change_15m","OI_change_1h","OI_change_8h", "volatility_5m","volatility_15m", "openinterest"])
    
    df = df[:limit]
    df = df.to_dict(orient='records')
    return "hello"



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)