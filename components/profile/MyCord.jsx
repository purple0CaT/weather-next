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
            <div className="my-2 w-50 mx-auto">
              <Link
                href="/weather"
                onClick={() =>
                  dispatch(
                    setCoords({
                      lon: weathCoord.longitude,
                      lat: weathCoord.latitude,
                    }),
                  )
                }
              >
                <div className="navBtn d-block">
                  <div>Check the weather near me</div>
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
            <div className=" my-2">
              <button
                style={{ color: "Brown", backgroundColor: "whitesmoke" }}
                className="navBtn"
                onClick={() => {
                  dispatch(clearCoord());
                }}
              >
                Delete my curent location
              </button>
            </div>
          </>
        )}
        {!weathCoord.latitude && (
          <div className="my-2">
            <button className="navBtn" onClick={() => addCordinates()}>
              Add my curent loc
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCord;
