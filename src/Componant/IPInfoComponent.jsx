import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import ScaleLoader from "react-spinners/ScaleLoader";


function IPInfoComponent({ userInput }, onChildData) {
  const [ipInfo, setIpInfo] = useState(null);
  const [lodding, setLodding] = useState(true);


  useEffect(() => {
    function getIPInfo() {
      fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((data) => {
          const ipToUse = userInput || data.ip;
          ipInfoFunc(ipToUse);
        })
        .catch((error) => console.error("Error:", error));
    }

    function ipInfoFunc(myip) {
      fetch(`https://ipapi.co/${myip}/json/`)
        .then((response) => response.json())
        .then((data) => {
          setIpInfo(data);
          // onChildData(data);
        })
        .catch((error) =>
          console.error("Error fetching IP information:", error)
        );
    }

    getIPInfo();
  }, [userInput]);

  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 3000);
  }, []);


  

  return (
    <div className="py-6 px-8 bg-black min-w-[340px] min-h-[450px] relative">
      <img src={logo} alt="" className="w-40 h-auto mx-auto mb-8 " />

      {userInput ? (
        <h1 className="bg-pureBlack text-green text-center py-2 px-4 font-bold border border-green mt-3">
          Your Input IP Information
        </h1>
      ) : (
        <h1 className="bg-pureBlack text-green text-center py-2 px-4 font-bold border border-green mt-3">
          Your Public IP Information
        </h1>
      )}

      {lodding ? (
        <ScaleLoader
        className="absolute top-64 left-36"
        color="#25b102"/>
      ) : (
        <div>
          {ipInfo && (
            <div id="ip-info" className="text-green mt-10">
              <p>
                <span className="text-white mr-2">Your IP address is: </span>{" "}
                {ipInfo.ip}
              </p>
              <p>
                <span className="text-white mr-2">Service Provider: </span>{" "}
                {ipInfo.error ? "Empty" : ipInfo.org}
              </p>
              <p>
                <span className="text-white mr-2">IP Type: </span>{" "}
                {ipInfo.error ? "Empty" : ipInfo.version}
              </p>
              <p>
                <span className="text-white mr-2">Your country is: </span>{" "}
                {ipInfo.error ? "Empty" : ipInfo.country_name}
              </p>
              <p>
                <span className="text-white mr-2">Your city is: </span>
                {ipInfo.error ? "Empty" : ipInfo.city}
              </p>
              <p>
                <span className="text-white mr-2">Your Postal Code: </span>
                {ipInfo.error ? "Empty" : ipInfo.postal}
              </p>
              <p>
                <span className="text-white mr-2">Calling Code: </span>
                {ipInfo.error ? "Empty" : ipInfo.country_calling_code}
              </p>
              <p>
                <span className="text-white mr-2">latitude:</span>{" "}
                {ipInfo.error ? "Empty" : ipInfo.latitude}
              </p>
              <p>
                <span className="text-white mr-2">longitude:</span>{" "}
                {ipInfo.error ? "Empty" : ipInfo.longitude}
              </p>
            </div>
          )}
          {ipInfo && (
            <div
              className="mt-10 border border-green py-2 px-4"
              style={{
                color:
                  ipInfo.org &&
                  (ipInfo.org.toLowerCase().includes("shared") ||
                    ipInfo.org.toLowerCase().includes("hosting"))
                    ? "#c80000"
                    : "#25b102",
              }}
            >
              {ipInfo.org &&
              (ipInfo.org.toLowerCase().includes("shared") ||
                ipInfo.org.toLowerCase().includes("hosting"))
                ? "Your IP address is shared"
                : "Your IP address is dedicated or real"}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default IPInfoComponent;
