import { useEffect, useState } from "react";
import "./App.css";
import IPInfoComponent from "./Componant/IPInfoComponent";
import MapContainer from "./Componant/MapContainer";

function App() {
  const [ip, setIP] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [childData, setChildData] = useState(null);

  useEffect(() => {
    // Simulate fetching latitude and longitude from user's IP
    // Replace this with actual code to fetch latitude and longitude from IP
    setTimeout(() => {
      setLatitude(24.3412);
      setLongitude(90.7642);
    }, 2000);
  }, []);

  const handleChildData = (data) => {
    setChildData(data);
  };

  console.log(childData, "child")
  return (
    <>
      <section className=" bg-pureBlack">
        <div className="grid lg:grid-cols-2 lg:grid-rows-1 xs:grid-rows-2 xs:h-full w-full lg:h-screen lg:pt-0 xs:pt-16">
          {/* IP Information */}
          <div className="grid place-content-center pb-6">
            <div className="mb-5">
              <input
                type="text"
                className="py-2 px-4 text-white bg-black text-center w-full placeholder:opacity-50"
                placeholder="Past your IP here"
                onChange={(e) => setIP(e.target.value)}
              />
            </div>
            <IPInfoComponent userInput={ip} onChildData={handleChildData} />
          </div>
          {/* Google Map */}
          <div className=" bg-pureBlack">
            {latitude && longitude && (
              <MapContainer latitude={latitude} longitude={longitude} />
            )}
          </div>
          
        </div>
      </section>
    </>
  );
}

export default App;
