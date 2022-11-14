import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Card(props) {
  const lat = props.data.location.lat;
  const long = props.data.location.long;
  const adressString = props.data.address.replace(/[0-9]/g, "");
  let charBuffer = "";
  const input = props.data.address;
  let s = input.split(" ");

  const token = "AIzaSyA5WHivv29XRW8m8-2t-hjVlqBlb-e8m30";
  const date1 = new Date();
  const date2 = new Date(props.data.createdAt);
  const diffTime = Math.abs(date2 - date1);
  const totalDifDay = parseInt(diffTime / (3600 * 24) / 1000);
  const currentPicture = props.data.pictures[props.data.pictures.length - 1];

  let [address, setAddress] = useState("");

  useEffect(() => {
    async function getAdress() {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en&key=${token}`
        )
        .then((response) => {
          if (response.data.results.length === 1) {
            setAddress("Address not found");
          } else if (response.data.results.length === 2) {
            setAddress(response.data.results.at(-1).formatted_address);
          } else {
            setAddress(response.data.results.at(-2).formatted_address);
          }
        })
        .catch((errors) => {
          console.log(errors);
        })
        .finally(() => {});
    }
    getAdress().then((r) => r);
  });

  function processWords(input) {
    s.forEach((element) => {
      charBuffer += element[0];
    });

    return charBuffer.replace(/[0-9]/g, "");
  }

  return (
    <div>
      <div className="bg-[#EFF0F5] md:bg-white rounded-lg shadow flex items-center pt-3 pb-7 px-4 md:py-3 gap-4">
        <img
          src={currentPicture}
          className="flex-none self-start h-16 w-16 object-cover rounded-full"
          alt="to"
        />
        <div className="w-full flex flex-col-reverse md:flex-row gap-3.5">
          <div className="max-w-2xl">
            <Link
              to={`/jobInfo/${props.data.id}`}
              className="text-lg font-normal text-slate-700 line-clamp-2 text-left md:font-bold"
            >
              {props.data.title}
            </Link>
            <div className="mt-1 flex items-center flex-wrap gap-3 text-[#878D9D]">
              <span>
                {props.data.name} • {adressString} - {processWords(input)}
              </span>
            </div>
            <div className="flex items-center mt-2 gap-x-1 text-[#878D9D]">
              <svg
                className="flex-none"
                width="13"
                height="18"
                viewBox="0 0 13 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 18C6.5 18 13 11.9706 13 7C13 2.02944 10.0899 0 6.5 0C2.91015 0 0 2.02944 0 7C0 11.9706 6.5 18 6.5 18ZM6.5 10C8.433 10 10 8.433 10 6.5C10 4.567 8.433 3 6.5 3C4.567 3 3 4.567 3 6.5C3 8.433 4.567 10 6.5 10Z"
                  fill="currentColor"
                />
              </svg>
              <span>{address}</span>
            </div>
          </div>
          <div className="flex-none flex items-center flex-wrap w-full md:w-auto justify-between md:justify-center md:ml-auto md:gap-x-8">
            <div className="flex items-center gap-[1px] text-[#38415D] md:gap-1 md:text-[#384564]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 md:w-6 md:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 md:w-6 md:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 md:w-6 md:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 md:w-6 md:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 md:w-6 md:h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="md:h-full flex-none flex flex-col items-end justify-between text-[#878D9D]">
              <svg
                className="hidden md:block flex-none"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 8.00016C8 6.5274 9.19391 5.3335 10.6667 5.3335H21.3333C22.8061 5.3335 24 6.5274 24 8.00016V23.9936C24 25.1595 22.609 25.7639 21.7567 24.9682L16.9099 20.4428C16.3976 19.9645 15.6024 19.9645 15.0901 20.4428L10.2433 24.9682C9.39104 25.7639 8 25.1595 8 23.9936V8.00016Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <p className="text-right">Posted {totalDifDay} days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
