import axios from "axios";
import React, { useEffect, useState } from "react";

const ExploreElement = () => {
  let [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://sakaarsen.lag.tf/api/explore")
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="mt-12 grid grid-cols-1  md:grid-cols-3 gap-4 place-items-center  ">
      {data.map((list, i) => {
        return (
          <div key={i}>
            <div className="h-52 w-64   backdrop-blur font-bold border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  mb-12">
              <div className="p-4 text-white">
                <p>{list.index}</p>
                <p>{list.price}</p>
                <div className="mt-2">
                  <div className="flex">
                    <p className="mr-16 text-slate-500">Change 1d </p>
                    <p className=" text-slate-500">{list.change_1h}</p>
                  </div>
                  <div className="flex">
                    <p className="mr-16 text-slate-500">24h Low </p>
                    <p className=" text-slate-500">{list.change_1h} </p>
                  </div>
                  <div className="flex">
                    <p className="mr-16 text-slate-500">Volume </p>
                    <p className=" text-slate-500">{list.volume_1d} </p>
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
