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
    # df = df.drop(columns=["ticks_5m","ticks_15m","ticks_1h","change_5m","change_15m","change_1h","change_8h", "volume_5m","volume_15m","volume_1h","volume_8h","vdelta_5m","vdelta_15m","vdelta_1h","vdelta_8h", "OI_change_15m","OI_change_1h","OI_change_8h", "volatility_5m","volatility_15m", "openinterest"])


    df = df[:100]

    df.to_csv("orionterminal.csv" , index=False)


