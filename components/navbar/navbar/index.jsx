import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  addTheName,
  setCleanAll,
  setSearch,
} from "../../../redux/actions/actions";
import style from "./Navbar.module.css";
import NavProf from "./NavProf";
//
const NavBar = (props) => {
  const router = useRouter();
  const [userName, setuserName] = useState("");
  const [DropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const weather = useSelector((state) => state.weather);
  //
  const closeDropdown = () => {
    setDropDown(false);
  };
  //
  return (
    <>
      <div className={style.navContainer}>
        <Container>
          <Row className={style.navBar}>
            <Col xs="6" md="4" className="d-flex align-items-center my-1">
              <Link href="/" onClick={(x) => dispatch(setCleanAll())}>
                <div className={"mr-3 " + style.navIcon}>
                  <AiFillHome size="1.8rem" />
                </div>
              </Link>
              <div className={style.navSearch}>
                <BsSearch className="mx-1" size="1.5rem" />
                <FormControl
                  // value={weather.search}
                  type="text"
                  placeholder="...search"
                  onChange={(e) => {
                    // dispatch(setSearch(e.target.value));
                    if (e.target.value.length > 0) {
                      router.push(`/weather/${e.target.value}`);
                    } else {
                      router.push(`/`);
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/weather/${weather.search}`);
                    }
                  }}
                />
              </div>
            </Col>
            <Col
              xs="6"
              md="8"
              className="d-flex align-items-center justify-content-end my-1"
            >
              {" "}
              <Link
                href="/"
                // activeClassName="selectedNavb"
                onClick={() => dispatch(setSearch(""))}
              >
                <div
                  className={
                    "d-flex align-items-center  font-weight-bold mr-2" +
                    " " +
                    style.navBtn
                  }
                >
                  <span className="text-dropdown">Home</span>
                </div>
              </Link>
              {!user?.name ? (
                <FormControl
                  className={style.nameInput}
                  placeholder="...your name"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && dispatch(addTheName(userName))
                  }
                />
              ) : (
                <>
                  <div className="separator mr-2"> </div>

                  <div className="position-relative">
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setDropDown(false);
                      }}
                    >
                      <div
                        className={
                          "d-flex align-items-center mr-2 " +
                          style.navBtn +
                          " " +
                          style.profileName
                        }
                        onClick={() => setDropDown(!DropDown)}
                        onMouseEnter={() => setDropDown(!DropDown)}
                        onMouseOver={() => setDropDown(true)}
                      >
                        <h5 className="my-0">{user.name}</h5>{" "}
                      </div>
                      <div>
                        {DropDown && <NavProf closeDropdown={closeDropdown} />}
                      </div>
                    </OutsideClickHandler>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      {/*  */}
      <main>{props.children}</main>
    </>
  );
};

export default NavBar;
