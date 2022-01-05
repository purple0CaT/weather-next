import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { addTheName } from "../../redux/actions/actions";
import style from "../../styles/navbar.module.scss";
import NavProf from "./NavProf";
//
const NavBar = (props) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [DropDown, setDropDown] = useState(false);
  const [userName, setuserName] = useState("");
  const [CityList, setCityList] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");
  //
  const fetchCityList = async (value) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_GEOSEARCH}/direct?q=${
        value ? value : SearchQuery
      }&limit=10&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setCityList(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
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
              <Link
                passHref
                href="/"
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <div className={"mr-3 " + style.navIcon}>
                  <AiFillHome size="1.8rem" />
                </div>
              </Link>
              <div className={style.navSearch}>
                <BsSearch className="mx-1" size="1.5rem" />
                <FormControl
                  value={SearchQuery}
                  type="text"
                  placeholder="...search"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length === 0) {
                      router.push(`/`);
                    }
                    if (e.target.value.length > 2) {
                      fetchCityList(e.target.value);
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      if (CityList.length > 0) {
                        router.push(
                          `/weather/${CityList[0].name},${CityList[0].country}`,
                        );
                        setSearchQuery("");
                        setCityList([]);
                        setDropDown(false);
                        setSearchQuery(CityList[0].name);
                      } else {
                        fetchCityList(e.target.value);
                      }
                    }
                  }}
                />
                {/* Search List  */}
                {SearchQuery && CityList.length > 0 && (
                  <div className={style.searchList}>
                    {CityList.map((City, index) => (
                      <div
                        key={City.lat + index}
                        className={style.searchListItem}
                        onClick={() => {
                          if (CityList.length > 0) {
                            router.push(
                              `/weather/${City.name},${City.country}`,
                            );
                            setDropDown(false);
                            setSearchQuery("");
                            setCityList([]);
                          } else {
                            fetchCityList();
                          }
                        }}
                      >
                        {City.name}, {City.country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>
            <Col
              xs="6"
              md="8"
              className="d-flex align-items-center justify-content-end my-1"
            >
              {" "}
              <Link passHref href="/">
                <div
                  onClick={() => setSearchQuery("")}
                  className={`d-flex align-items-center  font-weight-bold mr-2 navBtn ${
                    router.route === "/" && "selectedNavb"
                  }`}
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
                        className={`d-flex align-items-center  font-weight-bold mr-2 navBtn ${
                          style.profileNam
                        } ${router.route === "/profile" && "selectedNavb"}`}
                        onClick={() => setDropDown(!DropDown)}
                      >
                        <h5 className={`my-0 ${style.profileNameBtnSize}`}>
                          {user.name}
                        </h5>{" "}
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
