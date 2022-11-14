import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./card";
import { BasicPagination } from "./pagination";

export function Joblist() {
  let [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      await axios
        .get(
          "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
        )
        .then((response) => {
          setData(response.data);
        });
    }
    getData().then((r) => r);
  }, []);
  console.log(data);
  if (data.length === 0) {
    return <h2>Loading...</h2>;
  }
  const userList = data.map((item, index) => (
    <Card index={index} key={item.id} data={item} />
  ));
  return (
    <div className="App">
      <div className="sm:container mx-auto py-12 px-3">
        <div className="flex flex-col gap-2">{userList}</div>
        <div className="flex justify-center mt-5 ">
          <BasicPagination />
        </div>
      </div>
    </div>
  );
}
