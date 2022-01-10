const MapSideBar = ({ setMapType, MapType }) => {
  return (
    <>
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
    </>
  );
};

export default MapSideBar;
