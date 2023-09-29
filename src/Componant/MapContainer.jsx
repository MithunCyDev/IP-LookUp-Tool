// MapContainer.jsx
import React, { useEffect, useState } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";

const MapContainer = () => {
  const [lodding, setLodding] = useState(true);
  const storedLocation =
    localStorage.getItem("LiveLocation") !== "undefined"
      ? JSON.parse(localStorage.getItem("LiveLocation"))
      : JSON.parse(localStorage.getItem("Data"));
  const data = JSON.parse(localStorage.getItem("Data"));

  const center = {
    lat:
      storedLocation !== null && "undefined"
        ? storedLocation.latitude
        : data !== null && "undefined"
        ? data.latitude
        : 0,
    lng:
      storedLocation !== null && "undefined"
        ? storedLocation.longitude
        : data !== null && "undefined"
        ? data.longitude
        : 0,
  };

  useEffect(() => {
    setTimeout(() => {
      setLodding(false);
    }, 2000);
  }, [storedLocation]);

  return (
    <>
      {lodding ? (
        <div className="grid place-content-center w-full h-screen">
          <h1 className="text-green text-lg">Looding...</h1>
        </div>
      ) : (
        <LeafletMap
          className={lodding ? "hidden" : "block"}
          center={center}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center}></Marker>
        </LeafletMap>
      )}
    </>
  );
};

export default MapContainer;
