import os
import requests
import pandas as pd
import numpy as np
import json
from pprint import pprint

print("getcsv.py")

def getcsv():
    url = "https://data.orionterminal.com/api/screener"

    PATH = os.path.dirname(os.path.abspath(__file__))

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


    df = df[:100]

    df.to_csv("orionterminal.csv" , index=False)


