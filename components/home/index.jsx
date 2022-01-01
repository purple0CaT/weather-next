import dateFormat from "dateformat";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { FiNavigation2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
//
function MainPage() {
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  return (
    <Container>
      {weather.history?.length > 0 && (
        <>
          <hr />{" "}
          <h5 className="text-muted text-center">Your latest searches</h5>
          <Row>
            {weather.history.map((W) => (
              <Col xs="6" md="2" className="my-1" key={W.name + "asd"}>
                <Link
                  passHref
                  href={`/weather/${W.name},${W.sys.country}`}
                  key={W.main.temp + W.dt}
                  style={{ color: "unset " }}
                >
                  <div
                    className={
                      "d-flex flex-column " +
                      style.smallCard +
                      " " +
                      style.hoverCard
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <span>{dateFormat(new Date(W.dt * 1000), "HH:MM ")}</span>
                      <span>{dateFormat(new Date(W.dt * 1000), "d mmm")}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={`https://openweathermap.org/img/wn/${W.weather[0].icon}@2x.png`}
                        alt={weather.description}
                        className={style.imageWeather}
                        height={100}
                        width={100}
                      />
                    </div>
                    <h5 className="m-0 text-muted">{W.name}</h5>
                    <small>
                      {W.weather[0].main}, {W.weather[0].description}
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
                      <small className="text-muted font-weight-bold">
                        Min:{" "}
                      </small>
                      {Math.floor(W.main.temp_min)}°C
                    </small>
                    <small>
                      <small className="text-muted font-weight-bold">
                        Max:{" "}
                      </small>
                      {Math.floor(W.main.temp_max)}°C
                    </small>
                    {/* WIND COL */}
                    <div className="d-flex my-1 aling-items-between w-100">
                      <small>
                        <small className="text-muted font-weight-bold">
                          Wind:{" "}
                        </small>
                        {W.wind.speed}m/s{" "}
                      </small>
                      <div
                        className={
                          "d-flex align-items-center justify-content-center ml-auto " +
                          style.compasSM
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
                </Link>
              </Col>
            ))}
          </Row>{" "}
        </>
      )}
    </Container>
  );
}

export default MainPage;
