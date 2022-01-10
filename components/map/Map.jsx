import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import style from "./../../styles/map.module.scss";
import MapSideBar from "./MapSideBar";
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
  const [MapShow, setMapShow] = useState(true);
  const [MapType, setMapType] = useState("clouds_new");
  const mapStyle = profile
    ? {
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
      }
    : {
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(128, 128, 128, 0.5)",
      };
  //
  const handleMapType = (value) => {
    setMapType(value);
  };
  //
  useEffect(() => {
    setMapShow(false);
    setTimeout(() => {
      setMapShow(true);
    }, 1);
  }, [lat, MapType]);
  return (
    <>
      {lat && MapShow && (
        <div className="position-relative" style={mapStyle}>
          <div className={style.mapMenu}>
            <MapSideBar MapType={MapType} setMapType={handleMapType} />
          </div>
          <MapContainer
            center={[lat, lon]}
            zoom={5}
            scrollWheelZoom={false}
            style={{ minWidth: "20vh", minHeight: "27vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={`https://tile.openweathermap.org/map/${MapType}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`}
            />
            <Marker position={[lat, lon]} icon={getIcon(30)}></Marker>
            {/* {profile && <Circle center={[lat, lon]} radius={2000} />} */}
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default Map;
