import { useDispatch } from "react-redux";
import Link from "next/link";
import style from "../../styles/navbar.module.scss";
import { clearCoord, logOut } from "../../redux/actions/actions";

function NavProf({ closeDropdown }) {
  const dispatch = useDispatch();
  return (
    <div
      className={"d-flex flex-column " + style.shortMenu}
      onMouseLeave={() => closeDropdown()}
    >
      <Link
        passHref
        href="/profile"
        // activeClassName="selectedNavb"
      >
        <div
          onClick={() => closeDropdown()}
          className={
            "d-flex align-items-center  font-weight-bold my-1 " + style.navBtn
          }
        >
          <span className="text-dropdown">Profile</span>
        </div>
      </Link>
      <Link passHref href="/">
        <div
          onClick={() => {
            dispatch(logOut());
            dispatch(clearCoord());
          }}
          className={
            "d-flex align-items-center  font-weight-bold my-1 " + style.navBtn
          }
        >
          <span className="text-dropdown">Log out</span>
        </div>
      </Link>
    </div>
  );
}

export default NavProf;
