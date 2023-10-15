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
    <div className="mt-12 grid grid-cols-1  md:grid-cols-3 gap-4 place-items-center mb-12 ">
      {data.map((list, i) => {
        return (
          <div key={i}>
            <div className="h-52 w-64 rounded-lg  backdrop-blur border-white border-2">
              <div className="p-4 text-white">
                <p>{list.index}</p>
                <p>{list.price}</p>
                <div className="mt-2">
                  <div className="flex">
                    <p className="mr-16 text-slate-500">24h High </p>
                    <p className=" text-slate-500">$17512.24</p>
                  </div>
                  <div className="flex">
                    <p className="mr-16 text-slate-500">24h Low </p>
                    <p className=" text-slate-500">$17512.24</p>
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
