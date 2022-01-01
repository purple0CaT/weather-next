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
      <div>
        <h4 className="text-muted">History search</h4>
        <hr />
        <div>
          {weather.history &&
            weather.history.map((W) => (
              <div className="mx-auto" key={W.name + "3s3"}>
                <Link passHref href={`/weather/${W.name},${W.sys.country}`}>
                  <div className="d-flex justify-content-center align-items-center my-1">
                    <div className="navBtn d-flex justify-content-center align-items-center ">
                      <h6 className="m-0">
                        {W.name}, {W.sys.country}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div>
          {weather.history.length > 0 ? (
            <>
              <hr />
              <button
                className="navBtn"
                onClick={() => dispatch(deleteHistory())}
                style={{ color: "Brown", backgroundColor: "whitesmoke" }}
              >
                Delete history!
              </button>
            </>
          ) : (
            <div>
              {" "}
              <h5 className="text-muted text-center">Empty!</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchHistory;
