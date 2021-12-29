import { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker, Circle } from "react-leaflet";
import { useSelector } from "react-redux";
import { wrapper } from "../../redux/store/store";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
//
function getIcon(iconSize) {
  return L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize,
    iconAnchor: [15, 30],
  });
}

const Map = ({ lat, lon, profile }) => {
  // console.log(profile);
  return (
    <>
      {lat && (
        <div
          className="position-relative"
          style={{ minHeight: "20rem", minWidth: "20rem" }}
        >
          <MapContainer
            center={[lat, lon]}
            zoom={10}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]} icon={getIcon(30)}></Marker>
            {profile && <Circle center={[lat, lon]} radius={2000} />}
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default Map;
