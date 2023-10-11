import uvicorn
from fastapi import FastAPI
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
import sys
from pprint import pprint
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
from langchain.llms import HuggingFaceHub
from pydantic import BaseModel
import getcsv
import createEmbeddings
from datetime import datetime
from os import environ


app = FastAPI()
huggingFaceAPiKey = environ.get("HUGGINGFACE_API_KEY")

repoID="mistralai/Mistral-7B-Instruct-v0.1"

llmmodel = HuggingFaceHub(repo_id=repoID, model_kwargs={"max_new_tokens": 250, "temperature": 0.1, "repetition_penalty": 1.33},huggingfacehub_api_token=huggingFaceAPiKey)

template = """ You are a cryptocurrency expert chatbot called Ada. You help people gain insights from the universe of cryptocurrencies. Give generalized and short responses to the question asked. Do not use any dates or mention any apis used. Do not talk about your source of information.

Context:
```
{context}
```

Question: {question}
Helpful Answer:

"""

DB_FAISS_PATH = 'vectorstore/db_faiss'

# loader = CSVLoader(file_path='orionterminal.csv', encoding="utf-8", csv_args={'delimiter': ','})
# data = loader.load()

embedding_function = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2', model_kwargs={'device': 'cpu'})
db = FAISS.load_local(DB_FAISS_PATH, embedding_function)


# db = FAISS.from_documents(data, embedding_function)
# db.save_local(DB_FAISS_PATH)


prompt = PromptTemplate(template=template, input_variables=["context", "question"])

lastUpdateFileName = "lastUpdate.txt"
updateInterval = 3600

class Data(BaseModel):
    question: str


def checkCsvUpdate():
    try:
        with open(lastUpdateFileName, "r") as f:
            lastUpdate = f.read()
        
        lastUpdate = datetime.strptime(lastUpdate, "%Y-%m-%d %H:%M:%S.%f")
        now = datetime.now()
        diff = now - lastUpdate
        diff = diff.total_seconds()

        if diff > updateInterval:
            updateCsv()
    
    except:
        updateCsv()
    

def updateCsv():
    global db
    getcsv.getcsv()

    with open(lastUpdateFileName, "w") as f:
        f.write(str(datetime.now()))
    
    createEmbeddings.createEmbeddings()
    db = FAISS.load_local(DB_FAISS_PATH, embedding_function)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/ask")
async def root(data : Data):
    chain = ConversationalRetrievalChain.from_llm(llmmodel, retriever=db.as_retriever(), combine_docs_chain_kwargs={'prompt': prompt})
    question = data.question
    response = chain({"question" : question, "chat_history": []})
    answer = response["answer"]
    return {"answer": answer}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    