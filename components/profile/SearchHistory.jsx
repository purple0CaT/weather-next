import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, setSearch } from "../../redux/actions/actions";
import style from "./profile.module.css";
//
const Map = dynamic(() => import("../map/Map"), {
  ssr: false,
});
//
function SearchHistory() {
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const [IpLoc, setIpLoc] = useState();
  return (
    <div className={style.ipCard}>
      {IpLoc ? (
        <>
          <div>
            <h5 className="text-muted"></h5>
            <span>
              {IpLoc.country_name}, {IpLoc.state}, {IpLoc.city}, {IpLoc.postal}
            </span>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Map
              lon={IpLoc.longitude}
              lat={IpLoc.latitude}
              profile={"profile"}
            />
          </div>
        </>
      ) : (
        <div>
          <div>
            <button
              className="navBtn"
              onClick={() => dispatch(deleteHistory())}
              style={{ color: "Brown", backgroundColor: "whitesmoke" }}
            >
              Delete history!
            </button>
          </div>
          <hr />
          <div>
            {weather.history &&
              weather.history.map((W) => (
                <div className="mx-auto" key={W.name + "3s3"}>
                  <Link
                    href="/weather"
                    onClick={() => dispatch(setSearch(W.name))}
                    className=""
                  >
                    <h6>{W.name}</h6>
                  </Link>
                </div>
              ))}
          </div>
          {/* <h2 className="text-muted">No data!</h2> */}
        </div>
      )}
    </div>
  );
}
export default SearchHistory;
