from langchain.document_loaders.csv_loader import CSVLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
import time


DB_FAISS_PATH = 'vectorstore/db_faiss'

print("createEmbeddings.py")

def createEmbeddings():
    time.sleep(0.2)

    loader = CSVLoader(file_path='orionterminal.csv', encoding="utf-8", csv_args={'delimiter': ','})
    data = loader.load()

    embedding_function = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2', model_kwargs={'device': 'cpu'})
    db = FAISS.from_documents(data, embedding_function)
    db.save_local(DB_FAISS_PATH)
    print("Embeddings updated")