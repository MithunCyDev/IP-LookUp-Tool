// MapContainer.jsx
import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


const MapContainer = ({latitude, longitude}) => {
  const center = {
    lat: latitude, // Example latitude
    lng: longitude, // Example longitude
  };
  return (
    <LeafletMap center={center} zoom={15} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        
      </Marker>
    </LeafletMap>
  );
};

export default MapContainer;
