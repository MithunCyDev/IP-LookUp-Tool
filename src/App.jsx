import { useEffect, useState } from "react";
import "./App.css";
import IPInfoComponent from "./Componant/IPInfoComponent";
import MapContainer from "./Componant/MapContainer";

function App() {
  const [ip, setIP] = useState(null);
  const [livelocationmsg, setLivelocationmsg] = useState(false);
  const [live, setLive] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLivelocationmsg(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // User Live Location
    if (navigator.geolocation !== null) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setLivelocationmsg("Geolocation is not supported by this browser.");
    }

    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Use the latitude and longitude data
      if (latitude !== null && longitude !== null) {
        setLive({ latitude, longitude });
      }
    }

    function errorCallback(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLivelocationmsg("User denied the request for live location.");
          break;
        case error.POSITION_UNAVAILABLE:
          setLivelocationmsg("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setLivelocationmsg("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          setLivelocationmsg("An unknown error occurred.");
          break;
      }
    }
  }, [navigator.geolocation]);

  useEffect(() => {
    localStorage.setItem("LiveLocation", JSON.stringify(live));
  }, [live]);

  return (
    <>
      <section className=" bg-pureBlack">
        <div className="grid lg:grid-cols-2 lg:grid-rows-1 xs:grid-rows-2 xs:h-full w-full lg:h-screen lg:pt-0 xs:pt-16">
          {/* IP Information */}
          <div className="grid place-content-center pb-6">
            {/* Live Location warning */}
            <h1
              className={
                livelocationmsg
                  ? `mx-auto text-red font-medium bg-black py-2 px-4 mb-4 border border-red`
                  : "hidden"
              }
            >
              {livelocationmsg}
            </h1>

            <div className="mb-5">
              <input
                type="text"
                className="py-2 px-4 text-white bg-black text-center w-full placeholder:opacity-50"
                placeholder="Past your IP here"
                onChange={(e) => setIP(e.target.value)}
              />
            </div>
            <IPInfoComponent userInput={ip} />
          </div>
          {/* Google Map */}
          <div className=" bg-pureBlack">
            <MapContainer />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
