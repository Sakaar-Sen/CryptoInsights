from tvDatafeed import TvDatafeed, Interval
import pandas as pd
from pprint import pprint
import json
from datetime import datetime

tv = TvDatafeed()
data = tv.get_hist(symbol='BTCUSDT',exchange='BINANCE',interval=Interval.in_4_hour,n_bars=10)

data = data.drop(columns=["volume","open","high","low", "symbol"])
data = data.rename(columns={"close": "price"})
data = data.reset_index()
data["datetime"] = data["datetime"].apply(lambda x: x.strftime("%Y-%m-%d %H:%M:%S"))
date = data["datetime"].tolist()
price = data["price"].tolist()


data = {"datetime": date, "price": price}
data = json.dumps(data)
pprint(data)
pprint(type(data))