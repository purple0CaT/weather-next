import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import style from "./../../styles/map.module.scss";
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
        boxShadow: "0 2px 5px rgba(128, 128, 128, 0.329)",
      };
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
            <div className="d-flex align-items-center">
              <input
                checked={MapType === "clouds_new" ? true : false}
                type="radio"
                id="clouds"
                name="map-type"
                value="clouds_new"
                onChange={() => setMapType("clouds_new")}
              />
              <label className="m-0 ml-1" htmlFor="clouds">
                <small>Clouds</small>
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                checked={MapType === "precipitation_new" ? true : false}
                type="radio"
                id="precipitation"
                name="map-type"
                value="precipitation_new"
                onChange={() => setMapType("precipitation_new")}
                style={{ backgroundColor: "grey" }}
              />
              <label className="m-0 ml-1" htmlFor="precipitation">
                <small>Precipitation</small>
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                checked={MapType === "pressure_new" ? true : false}
                type="radio"
                id="Pressure"
                name="map-type"
                value="pressure_new"
                onChange={() => setMapType("pressure_new")}
              />
              <label className="m-0 ml-1" htmlFor="Pressure">
                <small>Pressure</small>
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                checked={MapType === "wind_new" ? true : false}
                type="radio"
                id="wind"
                name="map-type"
                value="wind_new"
                onChange={() => setMapType("wind_new")}
              />
              <label className="m-0 ml-1" htmlFor="wind">
                <small>Wind</small>
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                checked={MapType === "temp_new" ? true : false}
                type="radio"
                id="temp"
                name="map-type"
                value="temp_new"
                onChange={() => setMapType("temp_new")}
              />
              <label className="m-0 ml-1" htmlFor="temp">
                <small>Temperature</small>
              </label>
            </div>
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
