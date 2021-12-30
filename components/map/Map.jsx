import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
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
  return (
    <>
      {lat && (
        <div className="position-relative" style={mapStyle}>
          <MapContainer
            center={[lat, lon]}
            zoom={10}
            scrollWheelZoom={false}
            style={{ minWidth: "20vh", minHeight: "30vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
