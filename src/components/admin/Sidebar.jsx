import React from "react";
import { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsBuildingAdd } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaRegHandshake } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsHouseGear } from "react-icons/bs";
import { TbHomeHand } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { CiDollar } from "react-icons/ci";
import { PiNote } from "react-icons/pi";
import { BsCartCheck } from "react-icons/bs";
import { PiOfficeChairLight } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuMailQuestion } from "react-icons/lu";
import { TbSeo } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import Cookies from "./Cookies";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import SearchContext from "../../Context/Context1";

const a = { translate: "0px 0px" };
export default function Sidebar() {
  const userVal = useContext(UserContext);
  const navigate = useNavigate();
  const [loginadmin, setloginadmin] = useState(false);
  const [usertype, setusertype] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === "76342391251#@%#^%*(^%&^$$%#@$%448941/*-++y$#%$^^&^*$@") {
      setloginadmin(true);
    } else {
      setloginadmin(false);
    }
  });

  useEffect(() => {
    const lsusertype = localStorage.getItem("usertype");
    if (lsusertype === "admin") {
      setusertype(lsusertype);
    } else {
      setusertype(lsusertype);
    }
  });

  function Logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  // Assuming `a` is some initial style or state

  // Use a better initial state for your button and style
  let [togbtn, setTogBtn] = useState("Close");
  let [mystyle, setMyStyle] = useState({ translate: "0px" });

  function slide() {
    // Toggle the button state
    setTogBtn((prev) => (prev === "Close" ? "Open" : "Close"));

    // Set user in the context based on the button state
    userVal.setUser(togbtn);
  }
  console.log(togbtn, "toglle");
  // Now, you can use `togbtn` and `mystyle` in your component

  useEffect(() => {
    convertBtn();
  }, [togbtn]);
  const [btnsty, setBtnsty] = useState({
    width: "30px",
    height: "2px",
    backgroundColor: "white",
    margin: "5px 0px",
    transform: "rotate(-0.15turn)",
    transitionDuration: "500ms",
    translate: "0px 8px",
  });
  const [btnsty1, setBtnsty1] = useState({ display: "none" });
  const [btnsty2, setBtnsty2] = useState({
    width: "30px",
    height: "2px",
    backgroundColor: "white",
    margin: "5px 0px",
    transform: "rotate(42deg)",
    transitionDuration: "500ms",
    translate: "0px 2px",
  });
  function convertBtn() {
    if (togbtn === "Open") {
      setBtnsty({
        width: "30px",
        height: "2px",
        backgroundColor: "white",
        margin: "5px 0px",
        transform: "rotate(-0.15turn)",
        transitionDuration: "500ms",
        translate: "0px 8px",
      });
      setBtnsty1({ display: "none" });
      setBtnsty2({
        width: "30px",
        height: "2px",
        backgroundColor: "white",
        margin: "5px 0px",
        transform: "rotate(50deg)",
        transitionDuration: "500ms",
        translate: "0px 2px",
      });
      setTogBtn("Open");
      setMyStyle({
        translate: "-250px",
      });
    } else if (togbtn === "Close") {
      setBtnsty({
        width: "30px",
        height: "2px",
        backgroundColor: "white",
        margin: "5px 0px",
        transform: "rotate(0)",
        transitionDuration: "500ms",
      });
      setBtnsty1({
        width: "30px",
        height: "2px",
        backgroundColor: "white",
        margin: "5px 0px",
      });
      setBtnsty2({
        width: "30px",
        height: "2px",
        backgroundColor: "white",
        margin: "5px 0px",
        transform: "rotate(0)",
        transitionDuration: "500ms",
      });
      setTogBtn("Close");
      setMyStyle({
        translate: "0px",
      });
    }
  }

  localStorage.setItem("togval", togbtn);
  return (
    <>
      {loginadmin === true && usertype === "admin" ? (
        <>
          <nav id="navbar-main" className="my_navbar fixed-top  row">
            <div className="col-6">
              <a href="" className="real-logo">
                <h2>Raine & Horney</h2>
              </a>
            </div>

            <div onClick={slide} className="col-6 cross-txt">
              <div id="Bell" className="">
                <FaRegBell />
              </div>

              <div
                className="btn btn-dark "
                id="bars"
                onClick={convertBtn}
                style={{
                  width: "50px",
                  height: "50px",
                  padding: "0px",
                  background: "none",
                  border: "none",
                }}
              >
                <div style={{ display: "none" }}>{togbtn}</div>
                <div id="one" style={btnsty}></div>
                <div id="two" style={btnsty1}></div>
                <div id="three" style={btnsty2}></div>
              </div>
            </div>
          </nav>

          <section id="leftbar" className="sidebar" style={mystyle}>
            <div className="d-flex flex-column">
              <div className="profile">
                <img
                  src="/uploads/1698054685632.jpg"
                  alt=""
                  className="img-fluid rounded-circle"
                  style={{
                    height: "100px",
                    width: "120px",
                    backgroundPosition: "center",
                    border: "1px solid grey",
                  }}
                />
                <div className="name_detail">
                  <h4>Sanjay Chimmini</h4>
                  <small>CEO</small>
                </div>
              </div>

              <div className="menu-col">
                <ul>
                  <li id="home-side">
                    <Link
                      to="/"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <MdOutlineDashboardCustomize />
                      Dashboard
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/home"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <AiOutlineHome />
                      Home Page
                    </Link>
                  </li>

                  <hr />
                  <li id="home-side">
                    <Link
                      to="/Addproperty"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <IoSettingsSharp /> Add Property
                    </Link>
                  </li>
                  <li id="home-side">
                    <Link
                      to="/propertylist"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <IoSettingsSharp /> View Property
                    </Link>
                  </li>
                  <li id="home-side">
                    <Link
                      to="/facility"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <IoSettingsSharp /> Facilities
                    </Link>
                  </li>
                  <hr />

                  <li id="home-side">
                    <Link
                      to="/BuyPage"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <BsCartCheck /> Buy Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/RentPage"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <LuMailQuestion /> Rent
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/Sell"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <CiDollar /> Sell Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/OffPlan"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <PiNote /> Off Plan
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/newdev"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <BsCartCheck /> New Developments
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/Commercial"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <PiOfficeChairLight /> Commercial Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/Joinus"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <FaRegHandshake /> Join Us Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/PropertyManagement"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <BsHouseGear /> Property Management Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/MortagageService"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <TbHomeHand />
                      Mortgage Services
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/advisory"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <FaChalkboardTeacher />
                      Advisory Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/OurTeam"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <RiTeamFill />
                      Our team
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/newmember"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <RiTeamFill />
                      Team Member
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/blogsection"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <LuMailQuestion /> Blog
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/About"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <AiOutlineUsergroupAdd /> About Us Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/whyus"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <BsQuestionCircle /> Why Us Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/Contact"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <FiPhoneCall /> Contact Us Page
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/FandQ"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <LuMailQuestion /> F&Q
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/cookie"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <BsCartCheck /> Cookie Policey
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/pri&pol"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <LuMailQuestion /> Pri&Pol
                    </Link>
                  </li>

                  <li id="home-side">
                    <Link
                      to="/term&condition"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      <LuMailQuestion /> Tearm and Condition
                    </Link>
                  </li>

                  {/* <li id='home-side'> */}
                  <button
                    type="submit"
                    onClick={Logout}
                    className="btn-toggle align-items-center rounded collapsed text-white ms-2"
                    aria-expanded="fbtnalse"
                  >
                    Logout
                  </button>
                  {/* </li> */}
                </ul>

                <li>
                  <div className="progress-container">
                    <span className="progress-badge">Traffic this Month</span>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-warning"
                        role="progressbar"
                        aria-valuenow="67"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "67%" }}
                      >
                        <span className="progress-value">67%</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-container progress-info">
                    <span className="progress-badge">Server Load</span>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-warning"
                        role="progressbar"
                        aria-valuenow="86"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "86%" }}
                      >
                        <span className="progress-value">86%</span>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
              {/* <!-- .nav-menu --> */}
            </div>
          </section>
        </>
      ) : loginadmin === true && usertype === "sco" ? (
        <>
          <nav id="navbar-main" className="my_navbar fixed-top  row">
            <div className="col-6">
              <a href="" className="real-logo">
                <h2>Raine & Horney</h2>
              </a>
            </div>

            <div onClick={slide} className="col-6 cross-txt">
              <div id="Bell" className="">
                <FaRegBell />
              </div>

              <div
                className="btn btn-dark "
                id="bars"
                onClick={convertBtn}
                style={{
                  width: "50px",
                  height: "50px",
                  padding: "10px 3px 5px 9px",
                }}
              >
                <div style={{ display: "none" }}>{togbtn}</div>
                <div id="one" style={btnsty}></div>
                <div id="two" style={btnsty1}></div>
                <div id="three" style={btnsty2}></div>
              </div>
            </div>
          </nav>

          <section id="leftbar" className="sidebar" style={mystyle}>
            <div className="d-flex flex-column">
              <div className="profile">
                <img
                  src="/uploads/1698054685632.jpg"
                  alt=""
                  className="img-fluid rounded-circle"
                  style={{
                    height: "100px",
                    width: "120px",
                    backgroundPosition: "center",
                    border: "1px solid grey",
                  }}
                />

                <div className="name_detail">
                  <h4>Sanjay Chimmini</h4>
                  <small>CEO</small>
                </div>
              </div>

              <div className="menu-col">
                <ul>
                  <li id="home-side">
                    <Link
                      to="/SEO"
                      className=" btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      SEO Modules
                    </Link>
                  </li>

                  <li id="home-side pl-20">
                    <button
                      type="submit"
                      onClick={Logout}
                      className="btn-toggle align-items-center rounded collapsed text-white ms-2"
                      aria-expanded="fbtnalse"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              {/* <!-- .nav-menu --> */}
            </div>
          </section>
        </>
      ) : (
        <div></div>
      )}

      {/* <!-- End Header -->  */}
    </>
  );
}
