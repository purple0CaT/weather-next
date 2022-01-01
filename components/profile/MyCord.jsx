import dynamic from "next/dynamic";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCoord, setCoords } from "../../redux/actions/actions";
import styles from "./profile.module.css";
//
const Map = dynamic(() => import("../map/Map"), {
  ssr: false,
});
//
const MyCord = () => {
  const weathCoord = useSelector((state) => state.weather.mycord);
  const dispatch = useDispatch();
  //
  const addCordinates = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(
        setCoords({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        }),
      );
    });
  };
  return (
    <>
      {" "}
      <div className={"p-1 my-1  text-center " + styles.profCard}>
        {weathCoord.latitude && (
          <>
            <div className="my-2 d-flex justify-content-center">
              <Link
                href={`/weather/null?lat=${weathCoord.latitude}&lon=${weathCoord.longitude}`}
              >
                <div className="navBtn">
                  <span>Check the weather near me</span>
                </div>
              </Link>
            </div>
            <div className="d-flex justify-content-center my-2">
              <Map
                lon={weathCoord.longitude}
                lat={weathCoord.latitude}
                profile={true}
              />
            </div>
            <div className="my-2 d-flex align-items-center justify-content-center">
              <div
                style={{
                  color: "Brown",
                  backgroundColor: "whitesmoke",
                  // width: "3rem",
                }}
                className="navBtn"
                onClick={() => {
                  dispatch(clearCoord());
                }}
              >
                <span>Delete my location</span>
              </div>
            </div>
          </>
        )}
        {!weathCoord.latitude && (
          <div className="my-2 d-flex justify-content-center">
            <div className="navBtn" onClick={() => addCordinates()}>
              <span>Add my curent loc</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCord;
