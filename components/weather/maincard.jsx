import dateFormat from "dateformat";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FiNavigation2, FiSunrise, FiSunset } from "react-icons/fi";
import style from "./weather.module.css";
const Map = dynamic(() => import("../map/Map"), {
  ssr: false,
});
//
const MainCard = ({ data }) => {
  const [WeatherImg, setWeatherImg] = useState({
    state: "",
    colorOne: "",
    colorTwo: "",
  });
  //
  useEffect(() => {
    if (data?.weather) {
      switch (data.weather[0].main) {
        case "Clouds":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
            colorOne: "#ffffff",
            colorTwo: "#daddff",
          });
          break;
        case "Clear":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
            colorOne: "#ffffff",
            colorTwo: "rgb(255, 234, 177)",
          });
          break;
        case "Rain":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/rain.png",
            colorOne: "#ffffff",
            colorTwo: "rgb(177, 217, 255)",
          });
          break;
        case "Snow":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/snow.png",
            colorOne: "#ffffff",
            colorTwo: "rgb(215, 236, 255)",
          });
          break;
        case "Mist":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/mist.png",
            colorOne: "#ffffff",
            colorTwo: "rgb(182, 182, 182)",
          });
          break;
        case "Drizzle":
          setWeatherImg({
            state: "https://ssl.gstatic.com/onebox/weather/64/mist.png",
            colorOne: "#ffffff",
            colorTwo: "rgb(215, 236, 255)",
          });
          break;
        default:
          setWeatherImg({
            state: "",
            colorOne: "#ffffff",
            colorTwo: "",
          });
          break;
      }
    }
  }, [data]);
  return (
    <Row>
      {data && (
        <>
          <Col xs="12" md="7" className="my-1 p-1">
            <div
              className={"d-flex justify-content-between p-2 " + style.mainCard}
              style={{
                background: `linear-gradient(${WeatherImg.colorOne}, ${WeatherImg.colorTwo})`,
              }}
            >
              {/* LEFT COLUMN */}
              <div className="d-flex flex-column justify-content-between">
                {/* first col */}
                <div className="d-flex justify-content-between align-items-center">
                  <Image
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt=""
                    className="imageWeather"
                    height={100}
                    width={100}
                  />
                  <div className="d-flex flex-column text-left">
                    <h2 className="text-muted">
                      {Math.floor(data.main.temp)}°C
                    </h2>
                    <span>
                      {data.weather[0].main}, {data.weather[0].description}
                    </span>
                  </div>
                </div>
                {/* MIN MAX COL*/}
                <br />
                <span>
                  <small className="text-muted font-weight-bold">
                    Feels like:
                  </small>
                  {Math.floor(data.main.feels_like)}°C
                </span>
                <span>
                  <small className="text-muted font-weight-bold">
                    Pressure:{" "}
                  </small>
                  {data.main.pressure} hPa
                </span>

                {/* WIND COL */}
                <div className="d-flex my-1">
                  <span>
                    <small className="text-muted font-weight-bold">
                      Wind:{" "}
                    </small>{" "}
                    {data.wind.speed}m/s
                  </span>
                  <div className={style.compass}>
                    <FiNavigation2
                      style={{
                        transform: `rotate(${data.wind.deg}deg)`,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Cityy Column */}
              <div className="text-right d-flex flex-column justify-content-between mr-md-3">
                <div>
                  <h1>{data.name}</h1>
                  <span className="font-weight-bold text-muted">
                    {data.sys.country}
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span
                    className="text-white d-flex align-items-center justify-content-end my-1"
                    style={{ textShadow: "0 0 5px grey" }}
                  >
                    <FiSunrise
                      style={{ color: "yellow", marginRight: "0.5rem" }}
                      size="1.5rem"
                    />
                    {dateFormat(new Date(data.sys.sunrise * 1000), "HH:MM")}
                  </span>
                  <span className="text-muted d-flex align-items-center justify-content-end my-1">
                    <FiSunset
                      style={{ color: "black", marginRight: "0.6rem" }}
                      size="1.5rem"
                    />
                    {dateFormat(new Date(data.sys.sunset * 1000), "HH:MM")}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="12" md="5" className="w-100 h-100 p-2">
            <Map lat={data.coord.lat} lon={data.coord.lon} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default MainCard;
