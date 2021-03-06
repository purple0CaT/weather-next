import Image from "next/image";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FiNavigation2 } from "react-icons/fi";
import dateFormat from "dateformat";
import style from "./weather.module.css";
//
const IncomingDays = ({ data, multipData }) => {
  // const weather = useSelector((state) => state.weather);
  // console.log(multipData);
  return (
    <>
      <br />
      <h4 className="text-center text-muted"> Weather in 5 days</h4>
      <div className={"mb-3 " + style.mainCards}>
        {multipData.list &&
          multipData.list.map((W) => (
            <div
              className={"d-flex flex-column " + style.smallCard}
              key={W.main.temp + W.dt}
            >
              <div
                className="d-flex justify-content-between align-items-baseline mb-1 px-2"
                style={{
                  backgroundColor: "rgba(128, 128, 128, 0.2)",
                  boxShadow: "0 2px 5px rgba(128, 128, 128, 0.5)",
                }}
              >
                <small>{dateFormat(new Date(W.dt * 1000), "d mmm")}</small>
                <span> {dateFormat(new Date(W.dt * 1000), "ddd")}</span>
                <small className="font-weight-bold text-info">
                  {dateFormat(new Date(W.dt * 1000), "HH:MM ")}
                </small>
              </div>
              <div className="p-1 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center">
                  <Image
                    src={`https://openweathermap.org/img/wn/${W.weather[0].icon}@2x.png`}
                    alt=""
                    className="imageWeather"
                    height={100}
                    width={100}
                  />
                </div>
                <span className="text-muted font-weight-bold text-right">
                  {Math.floor(W.main.temp)}°C
                </span>
                <small>
                  {W.weather[0].main}, {W.weather[0].description}
                </small>
                <small>
                  <small className="text-muted font-weight-bold">
                    Feels like:{" "}
                  </small>
                  {Math.floor(W.main.feels_like)}°C
                </small>
                <small className="mr-2 ">
                  <small className="text-muted font-weight-bold">Temp: </small>
                  {Math.floor(W.main.temp)}°C
                </small>
                {/* WIND COL */}
                <div className="d-flex aling-items-center w-100 mb-2">
                  <small className="mt-auto">
                    <small className="text-muted font-weight-bold">
                      Wind:{" "}
                    </small>
                    {W.wind.speed}m/s{" "}
                  </small>
                  <div
                    className={
                      "d-flex align-items-center justify-content-center ml-auto " +
                      style.compass
                    }
                  >
                    <FiNavigation2
                      style={{
                        transform: `rotate(${W.wind.deg}deg)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default IncomingDays;
