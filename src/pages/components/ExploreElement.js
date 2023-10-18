import axios from "axios";
import React, { useEffect, useState } from "react";

const ExploreElement = () => {
  let [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("/api/explore")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="z-0 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center  ">
      {data.map((list, i) => {
        return (
          <div key={i}>
            <div className="h-52 w-64 backdrop-blur font-bold border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] mb-12 z-0 relative">
              <div className="p-4 text-white z-0">
                <p>{list.index}</p>
                <p>{list.price}</p>
                <div className=" mt-2 flex">
                  <div className="mr-8   flex-column">
                    <p className=" text-slate-300">Change 1d </p>
                    <p className=" text-slate-300">Change 1h</p>
                    <p className=" text-slate-300">Volume</p>
                    <p className=" text-slate-300">Market Cap</p>
                  </div>
                  <div className="flex-column">
                    <p className=" text-slate-300">{list["Change 1d"]}</p>
                    <p className=" text-slate-300">{list["Change 1h"]} </p>
                    <p className=" text-slate-300">{list["Volume 1d"]} </p>
                    <p className=" text-slate-300">{list["Market Cap"]} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExploreElement;
