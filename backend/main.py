import uvicorn
from fastapi import FastAPI
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
import sys, os
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
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
huggingFaceAPiKey = os.getenv('HUGGINGFACEHUB_API_TOKEN')

repoID="mistralai/Mistral-7B-Instruct-v0.1"

llmmodel = HuggingFaceHub(repo_id=repoID, model_kwargs={"max_new_tokens": 250, "temperature": 0.1, "repetition_penalty": 1.33},huggingfacehub_api_token=huggingFaceAPiKey)

template = """You are a cryptocurrency expert chatbot called Ada. You help people gain insights from the universe of cryptocurrencies. Today's Date is {date}.

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
updateInterval = 3600

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
    answer = response["answer"]
    return {"answer": answer}


@app.get("/api/news")
async def news(limit : int = 100):
    url = "https://news.treeofalpha.com/api/news?limit=300"
    response = requests.get(url)
    response = response.json()
    result = []
    for i in response:
        try:

            coin = i["suggestions"][0]["coin"]
            foldername = "logos/"
            coin = coin.lower()

            imgPath = os.path.join(foldername, coin+".png")
            
            if i["source"] != "Twitter" and len(result) < limit and os.path.exists(imgPath):
                    result.append({"title": i["title"],"source": i["source"], "url": i["url"], "coin": coin })
        except:
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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    