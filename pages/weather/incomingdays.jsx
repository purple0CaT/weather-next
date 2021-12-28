import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
//
const IncomingDays = () => {
  const weather = useSelector((state) => state.weather);

  return (
    <>
      <br />
      <div className="mainCards mb-3s">
        {weather.days.list &&
          weather.days.list.map((W) => (
            <div
              className="d-flex flex-column smallCard"
              key={W.main.temp + W.dt}
            >
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${W.weather[0].icon}@2x.png`}
                  alt=""
                  className="imageWeather"
                />
              </div>
              <small>
                {weather.oneday.weather[0].main},{" "}
                {weather.oneday.weather[0].description}
              </small>
              <span className="text-muted font-weight-bold text-right">
                {Math.floor(W.main.temp)}°C
              </span>
              <small>
                <small className="text-muted font-weight-bold">
                  Feels like:
                </small>
                {Math.floor(W.main.feels_like)}°C
              </small>
              <small className="mr-2 my-1">
                <small className="text-muted font-weight-bold">Min: </small>
                {Math.floor(W.main.temp_kf)}°C
              </small>
              <small>
                <small className="text-muted font-weight-bold">Max: </small>
                {Math.floor(W.main.temp_max)}°C
              </small>
              {/* WIND COL */}
              <div className="d-flex my-1 aling-items-between w-100">
                <small>
                  <small className="text-muted font-weight-bold">Wind: </small>
                  {W.wind.speed}m/s{" "}
                </small>
                <div className="d-flex align-items-center justify-content-center compasSM ml-auto">
                  <FiNavigation2
                    style={{
                      transform: `rotate(${W.wind.deg}deg)`,
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <span>{dateFormat(new Date(W.dt * 1000), "HH:MM ")}</span>
                <span>{dateFormat(new Date(W.dt * 1000), "d mmm")}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default IncomingDays;
