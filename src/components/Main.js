import React, { useEffect, useState, useContext } from "react";
import WhatsappChat from "./Notification/Whatapp";
import Chatbot from "./Notification/Chatbot";
import Popup from "./Notification/Popup";
import "../styles/main/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Slider from "react-slick";
import "react-phone-input-2/lib/style.css";
import Testomonial from './home-testimonials/Testimonial';
import SearchContext from "../Context/Context1";
import Countries from "./CommonElements/CountryInfo";
import '../styles/main/sale.css'
import "react-toastify/dist/ReactToastify.css";
import { createNotification } from "./Notification/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa'
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { RxDimensions } from "react-icons/rx";
import Swal from 'sweetalert2';

const NextArrow = ({ onClick }) => (
  <div className="custom-next-arrow" onClick={onClick}>
    {/* Your custom next arrow content */}
    <div className="arrow-right1">
      <IoIosArrowForward style={{ color: "#212529", fontSize: "1.5rem" }} />
    </div>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-prev-arrow" onClick={onClick}>
    <div className="arrow-left1">
      <IoIosArrowBack style={{ color: "#212529", fontSize: "1.5rem" }} />
    </div>
  </div>
);



const Main = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectdrop, setselectdrop] = useState("buy");
  const [place, setPlace] = useState("");
  const [sliceval, setSliceVal] = useState('');
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      let newSliceVal = 4; // Default slice end index
      if (screenWidth >= 768 && screenWidth <= 992) {
        console.log(screenWidth, "width");
        newSliceVal = 3;
      }
      else if (screenWidth >= 576 && screenWidth <= 768) {
        newSliceVal = 2;
      }
      setSliceVal(newSliceVal);
    }

    // Initial call to set slice value based on initial screen width
    handleResize();

    // Add event listener to handle screen width changes
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [/* no dependencies */]);
  const navigate = useNavigate()
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    // autoplaySpeed: 4000,
    pauseOnHover: true,
    customPaging: function (i) {
      return (
        <div className="custom-dots">
        </div>
      );
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  const [value, setvalue] = useState("Sale");
  const getmydata = useContext(SearchContext);
  const [jsonData, setJsonData] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [listingType, setlistingType] = useState("");
  const [Propertyaddress, setPropertyaddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeButton, setActiveButton] = useState("Sale");
  const [isChecked, setIsChecked] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");

  const createMarkup = (html) => ({ __html: html });
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  // ****************Romove Html Tags******************
  function removeHtmlTags(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  function extractTextFromHtml(html, elementTag) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var element = doc.querySelector(elementTag);
    return element ? removeHtmlTags(element.innerHTML) : "";
  }

  // ****************Romove Html Tags End******************

  const handlefieldChange = (e) => {

    setFilterLocation(e.target.value)
  }
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const [subemail, setSubemail] = useState("");
  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };
  function renderWithLineBreaks(text) {
    // Replace <br/> with \n
    const replacedText = text.replace(/<br\s*\/?>/g, '\n');
    // Split the text by newline character and map each part to a <p> element
    const paragraphs = replacedText.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
    return paragraphs;
  }
  function SearchFilter(e) {
    e.preventDefault();
    getmydata.setIssearch(true);
    getmydata.setloc(filterLocation);
    if (selectdrop === 'buy') {
      const buy = "buy"
      localStorage.setItem("whichpage", buy)
      navigate('/buy')
    }
    else if (selectdrop === 'rent') {
      const rent = "rent"
      localStorage.setItem("whichpage", rent)
      navigate('/rent')
    }
    else {
      navigate('/salepage')
    }
  }

  function Singleproperty(e) {
    const id = e.target.id
    // alert(id)
    localStorage.setItem('propertyid', id)
    navigate('/singleproperty')
  }

  const dialCode = selectedCountry.phone[0];


  function GoTOAboutUS() {
  
	  window.open('/aboutus', '_blank');
  
  }


  function fetchdata() {
    const name = value;
    if (name == "Sale") {
      axios.get(`http://localhost:4000/allprosale`).then((res) => {
        setJsonData(res.data);
        setLoading(false);
      })
        .catch((error) => {
          console.error("Error fetching data from the server:", error);
        });
    }
    else {
      axios.get(`http://localhost:4000/allprorent`).then((res) => {
        setJsonData(res.data);
        setLoading(false);
      })
        .catch((error) => {
          console.error("Error fetching data from the server:", error);
        });
    }
  }



  const [visited, setVisited] = useState(false);

  function popupShow() {
    const check = localStorage.getItem("popupitem")
    if (check === "visitior") {
      console.log("ok")
    } else {

      const check = localStorage.setItem("popupitem", "visitior")
      setInterval(() => {

      }, 4000);
    }
  }

  useEffect(() => {
    popupShow()
  }, [])

  useEffect(() => {
    popupShow()
  }, [])
  useEffect(() => {
    fetchdata();
    const user = "@#%%$#$$u%$##S+_+__+E__%#%Rs";
    localStorage.setItem("guest", user);

    const check = localStorage.getItem("visit");

    if (!check && !visited) {
      console.log("Making the POST request");
      const data = { count: "yes" };

      axios.post(`http://localhost:4000/traffic`, data).then((res) => {
        if (res.data) {
          const count = "true";
          localStorage.setItem("visit", count);
          setVisited(true);
        }
      });
    }
  }, [visited]);

  useEffect(() => {
    if (value) {
      fetchdata();
    }
  }, [value]);

  const handleButtonClick = (buttonId) => {
    setvalue(buttonId);
    setActiveButton(buttonId);
  };

  function Submit(e) {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      listingType: listingType,
      Propertyaddress: Propertyaddress,
      dialCode: dialCode,
      phoneNumber: phoneNumber,
    };




    if (name && email && listingType && Propertyaddress && dialCode && phoneNumber) {
      axios.post(`http://localhost:4000/userinfo`, data).then((res) => {
        if (res.data) {
          Swal.fire({
              title: 'Success!',
              text: 'Data is Added Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
        } else {
          Swal.fire({
              title: 'Success!',
              text: 'Data is Added Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
        }
      });
    }
    else {
        Swal.fire({
        title: 'Warning!',
        text: 'Please Enter Valid Details!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }


  function SubscribeEmailGet(e) {
    e.preventDefault();
    if (isChecked === true) {
      let data = { 'subemail': subemail };
      axios.post(`http://localhost:4000/getemailforsub`, data).then((res) => {
        if (res.status === 200) {

          Swal.fire({
            title: 'Success!',
            text: 'Thankyou For Subscribing Us!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        } else {
          // alert("Userinfo is already present!");
          Swal.fire({
            title: 'Success!',
            text: 'You are already subscribed!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
    else {
      createNotification("warning", "Please Click on Agree for Further Processing");
    }

  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function Careerpage() {
   
	   window.open('/testimonials', '_blank');
  }


  function whichPage(e) {
    const page = e.target.value
    setselectdrop(page)
  }

  // **************Blog Data Fetch****************
  const [blogdata, setblogdata] = useState([])
  useEffect(() => {

    axios.get(`http://localhost:4000/blogdatafecth`, blogdata).then((res) => {
      setblogdata(res.data)

    })
  }, []);

  // **************HOme Data Fetch****************
  useEffect(() => {
    const homedata = { "tablename": "homepagedb" }
    axios.post(`http://localhost:4000/staticdata`, homedata).then((res) => {
      setdata(res.data)
    })
  }, []);

  function Saveblogid(e) {
    const blogid = e.target.id
    localStorage.setItem("blogid", blogid)
    navigate("/blogfirst")
  }



  function extractTextFromHtml1(html, tag, index, charLimit) {
    const match = html.match(new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, 'g'));
    if (match && match.length > index) {
      const plainText = match[index].replace(new RegExp(`<${tag}.*?>|<\/${tag}>`, 'g'), '');
      return plainText.length > charLimit ? plainText.substring(0, charLimit) + '...' : plainText;
    }
    return '';
  }

  const [popuptrue, setpopuptrue] = useState(false);

  function popupShow() {
    const check = localStorage.getItem("popupitem")
    if (check === "visitior") {
      console.log("ok")
    } else {

      setInterval(() => {
        localStorage.setItem("popupitem", "visitior")
        setpopuptrue(true)
      }, 4000);
    }
  }

  useEffect(() => {
    popupShow()
  }, [])

  useEffect(() => {
  }, [popuptrue])

  return (
    <>
      {popuptrue === true ?
        <>
          <Popup />
        </>
        :
        <>
        </>
      }

      <div className="">
        {data.map((item, index) => {

          return (
            <>


              <main id="main">
                <ToastContainer />

                {/* *************Header******************** */}

                <div className="container-fluid sec-2" id="bannerimage" style={{ backgroundImage: `url(/uploads/${item.sec1bg})`, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{width:"100%"}} >
                    <h2 id="unlock" style={{ maxWidth: "470px", margin: "auto", textAlign: "center" }}> {item.sec1heading}</h2>
                    <div className="search-engine-main">
                      <div className="row engine-code">
                        <div className="mx-1 my-1 col-sm-2 property-option">
                          <select onChange={whichPage} name="" className="class-select-menu select-input-field" id="" style={{ outline: "none" }}>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                          </select>
                        </div>
                        <div className=" col-sm-7 mx-1 my-1 property-option">
                          <input type="text" onChange={handlefieldChange} className="search-engine-input" placeholder="Search..." />
                        </div>
                        <div className=" col-sm-2 mx-1 my-1 property-option prop-faltu">
                          <button className="search-engine-btn" onClick={SearchFilter}>Search</button>
                        </div>
                      </div>
                    </div>
                    {/* Search Engine Design on Home Page End */}
                  </div>
                </div>



                {/* *************RENT AND SALE******************** */}
                <div className="container our-property">
                  <h2 id="explore-property" className="center" >{item.sec2heading}</h2>


                  <ul className="nav nav-pills mt-5 " id="pills-tab" role="tablist">

                    <div className="centered-container" style={{ margin: "auto" }} >
                      <button className={`salerentbtn ${activeButton === "Sale" ? "active" : ""}`}
                        style={{ backgroundColor: activeButton === "Sale" ? "#fcaf17" : "" }} id="Sale" onClick={() => handleButtonClick("Sale")}>
                        Buy
                      </button>
                      <button className={`salerentbtn ${activeButton === "Rent" ? "active" : ""}`} style={{ backgroundColor: activeButton === "Rent" ? "#fcaf17" : "" }} id="Rent"
                        onClick={() => handleButtonClick("Rent")}>
                        Rent
                      </button>
                    </div>
                  </ul>

                  <div className="container mt-4" >
                    <div className="row ">



                      <div className="row" style={{ margin: " auto",padding:"0px"}}>

                        {loading ? (
                          <p className="all-para">Loading...</p>
                        ) : (
                          <>
                            <Slider {...settings} className="sliderpadding" style={{ backgroundColor: "white", width: "100%",borderRadius:"0px" }}>
                              {jsonData.map((item, key) => {

                                const im = JSON.parse(item.Imagelink);
                                const items = im[1];
                                return (
                                  <>


                                    <div className="card p-0 mb-12" id="home-div-card" >
                                      <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src={items} alt="Card cap" style={{ width: 'auto',cursor: 'pointer' }} />

                                      <div className="card-body" style={{ padding: '25px' }}>


                                        <h5 className="card-title Cardtitle" onClick={Singleproperty} id={item.PropertyID}>                                                            {item.Property_Title}</h5>


                                        <p className="card-text details" style={{ marginTop: '-5px', minHeight: '10px', overflow: 'hidden' }}>                                           {item.Community}, {item.Unit_Type}.</p>

                                        <div className="additional-details " style={{ margin: '20px 0px' }}>

                                          <div className="bed details inline-flex">
                                       
										     <img src="/images/bedromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom"/>
											<span style={{ marginTop: "10px",marginLeft: "5px" }}>{item.No_of_Rooms}</span>
                                            <span id="spacing" style={{ fontSize: "25px" }}>|</span>
                                          </div>

                                          <div className="bathtub details inline-flex">
                                            											 <img src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bathroom"/>
											<span style={{ marginTop: "10px",marginLeft: "5px" }}>{item.No_of_Bathroom}</span>
                                            <span id="spacing" style={{ fontSize: "25px" }}>|</span>
                                          </div>

                                          <div className="squre-ft details inline-flex">

											 <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="size"/>
                                            <span style={{ marginTop: "10px",marginLeft: "5px" }}>{item.Unit_Builtup_Area}</span> <span className="text-lowercase" style={{ marginTop: "5px" }}>{item.unit_measure}</span>
                                          </div>
                                        </div>

                                        <p className="price-details" id="">AED <strong className="price-all">{formatNumberWithCommas(item.Price)}</strong> </p>

                                      </div>
                                    </div>

                                  </>
                                );
                                // }
                              })}
                            </Slider>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* *************FORM******************** */}
                <div className="container property-form" style={{ padding: "40px 10px", width: "87%" }}>
                  <div className="container">

                    <div className="form-title" style={{ padding: "0px !important" }}>
                      <h2 id="" className="center">{item.sec3heading}</h2>
                      <p id="seel-property-para-thinking">{item.sec3description} </p>
                    </div>

                  </div>

                  <div className="container">
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-12 col-sm-12 col-md-6	col-lg-7 col-xl-7">

                        <form action="#" style={{ color: '#212529', }}>

                          <div className="form-group">
                            <input onChange={(e) => setName(e.target.value)} type="text" style={{ borderRadius: "0px !important" }} className="form-control" id="name" placeholder="Full Name*" required />
                          </div>

                          <div className="form-group">
                            <input onChange={(e) => setemail(e.target.value)} type="email" style={{ borderRadius: "0px !important" }} className="form-control contcolor" id="mail" placeholder="Email*" required />
                          </div>

                          <div className="form-group" style={{ position: "relative", height: "50px" }}>

                            <Dropdown style={{ position: "absolute", borderRight: "1px solid #ddd", height: "50px" }}>

                              <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center" ,justifyContent: "space-between"}}>
    <img src={selectedCountry.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
    <p style={{ marginLeft: "50px" }}>{dialCode}</p>
  </div>
  <span className="caret">
   <img className="arrow-alteration" src="/images/arrow-icon.svg" alt="" />
  </span>
</Dropdown.Toggle>



                              <Dropdown.Menu style={{ height: "200px", overflow: "auto" }}>

                                {Countries.map((item) => {
                                  return (

                                    <Dropdown.Item onClick={() => handleCountrySelect(item)}>
                                      <div id="image-code">
                                        <img src={item.image} alt={item.name} style={{ width: "30px", height: "32px" }} />
                                        <p className="ml-5 mt-1">{item.name}{item.phone && item.phone.length > 0 ? item.phone[0] : "N/A"}
                                        </p>
                                      </div>
                                    </Dropdown.Item>

                                  );
                                })}
                              </Dropdown.Menu>

                            </Dropdown>

                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "165px" }} />
                          </div>

                          <select className="form-control formselect" style={{height:"50px"}} id="main-form-select" required onChange={(e) => setlistingType(e.target.value)} >
                            <option id="listing-type">Listing type*</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>

                          <div className="form-group" style={{}}>
                            <input onChange={(e) => setPropertyaddress(e.target.value)} type="text" style={{ float: 'left', width: "100%" }} className="form-                              control" id="address" placeholder="Property Adddress*" name="address" required />
                          </div>

                          <button type="submit" className="btn btn-secondary ml-3" onClick={Submit}>Submit</button>
                        </form>
                      </div>

                      <div className="col-12 col-sm-12 col-md-5	col-lg-5 col-xl-5">
                        <img src={`uploads/${item.sec3image}`} alt="img" className="img-fluid" id="homeimg" style={{ height: "460px" }} />
                      </div>

                    </div>
                  </div>
                </div>

                {/* *************Hoiday Homes******************** */}
                <div className="container-fluid col-md-12 sec-4 d-flex align-items-center paradise-style" id="escape_holiday" style={{ backgroundImage: `url(/uploads/${item.sec4bgimage})`}}>
  <div style={{  textAlign: "center", width: "100%" }}>
    <h1 className="main-banner-heading" style={{ marginTop: "0px" }}>{item.sec4heading}</h1>
    <h3>{item.sec4subheading}</h3>
    <div className="center">
      <a target="blank" href="https://www.rhvacations.ae">
        <button type="submit" className="btn btn-explore" href="">
          {item.sec4button}
        </button>
      </a>
    </div>
  </div>
</div>


                {/* ***************OVERVIEW***************** */}
                <div className="container counter-sec" id="no_div">
  <div className="row g-1 .overview-change" style={{ justifyContent: 'space-between' }}>
    <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
      <img src={`/uploads/${item.sec5image}`} alt="Los Angeles" className="img-fluid" style={{ width: "100%",height:"100%" }} />
    </div>

    <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center overview-change">
      <div>
        <div className="row" id="norow1">
          <div className="box-145" style={{ padding: "0px auto 5px" }}>
            <h4 className="no_headings">{item.sec5number1}</h4>
            <p className=" no_para">{item.sec5numberdiscription1}</p>
          </div>
        </div>

        <div className="row" id="norow2">
          <div className="box-145" style={{ padding: "0px auto 5px" }}>
            <h4 className="no_headings">{item.sec5number2}</h4>
            <p className=" no_para">{item.sec5numberdiscription2}</p>
          </div>
        </div>

        <div className="row" id="norow3">
          <div className="box-50 box-145" style={{ padding: "0px auto 5px" }}>
            <h4 className="no_headings">{item.sec5number3}</h4>
            <p className=" ">
              {item.sec5numberdiscription3}
              {/* COUNTRIES <br />&amp; TERRITORIES */}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


                {/* *************Our Story******************** */}
                <div className="container content-sec" id="our-story-main-div" >
                  <div className="row " >
                    <div className="col-md-12">
                      <h3 className="all-main-heading our_story">{item.sec5heading}</h3>
                      <p className="all-para our_story_para" style={{width:"100%"}}>
                        {item.sec5discription}
                      </p>


                      <button type="submit" className="btn btn-news" onClick={GoTOAboutUS}>Read More</button>
                    </div>

                  </div>
                </div>
                {/* *************WHY CHOOSE US******************** */}

                <div className="container why-choose">

                  <div className="row main-why-choose">
                    <div className="col-md-12">
                      <h2 className="all-main-heading" id="why_heading_id" style={{ textAlign: 'center' }}>{item.sec6heading}</h2>
                    </div>
                  </div>

                  <div className="row" id="why-chhose-us-main-divs">
                    <div className="col-md-4">
                      {/* src={`uploads/${item.sec6logo}`} */}
                      <img src="/images/Educated.png" alt="Los Angeles" className="img-fluid" style={{ width: "100px" }} />
                      <h4 className="grey pb-2 all-sub-heading" >{item.sec6logoheading}</h4>
                      <p className="all-para">{item.sec6logodiscription}</p>
                    </div>

                    <div className="col-md-4">
                      {/* src={`uploads/${item.sec6logo2}`} */}
                      <img src="/images/Technologymain.png" alt="Los Angeles" className="img-fluid" style={{ width: "100px" }} />
                      <h4 className="grey pb-2 all-sub-heading">{item.sec6logoheading2}</h4>
                      <p className="all-para">
                        {item.sec6logodiscription2}
                      </p>
                    </div>

                    <div className="col-md-4">
                      {/* src={`uploads/${item.sec6logo3}`} */}
                      <img src="/images/Ethical.png" alt="Los Angeles" className="img-fluid" style={{ width: "100px" }} />
                      <h4 className="grey pb-2 all-sub-heading">{item.sec6logoheading3}</h4>
                      <p className="all-para">
                        {item.sec6logodiscription3}
                      </p>
                    </div>
                  </div>

                </div>


                {/* *************TESTIMONIALS******************** */}

                <div className="container-fluid testimonials">
                  <div className="row">
                    <div className="col-md-12">

                      <h2 className="all-main-heading" style={{ textAlign: 'center' }}>{item.sec7heading}</h2>
                      <div className="rating">
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                        <i className="fa fa-star" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* *************Testomonials*************** */}
                  <div className="row">
                    <Testomonial />
                  </div>
                  <div className="row">
                    <div className="col-md-12 view-more">
                      <button type="submit" onClick={Careerpage} className="btn btn-news">{item.sec7button}</button>
                    </div>
                  </div>
                </div>

                {/* *************News & Insight*************** */}
                <div className="container news">
                  <div className="row news-css-change">
                    <div className="col-md-12">
                      <h2 className="all-main-heading" style={{ textAlign: 'center', color: '#4e5158' }}>{item.sec8heading}</h2>
                    </div>
                  </div>

                  <div className="row mt-3" >
                    {blogdata.slice(0, sliceval).map((item, index) => {

                      const extractedText = extractTextFromHtml1(item.content, 'p', 0, 75);
                      const imageUrl = item.featuredHome ? `uploads/${item.featuredhome}` : `uploads/${item.featured_image}`;

                      return (
                        <>
                          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" id={item.ID}>
                            <a href={`/${item.url}`}>
                              <img src={imageUrl} alt="Los Angeles" className="img-fluid" style={{ width: "100%" }} />
                            </a>
                            <p className='' style={{ marginTop: "11px" }}>{formatDate(item.date)}</p>
                            <h1 className='all-sub-heading' style={{ textAlign: "left", marginTop: "5px" }}>{item.title}</h1>
                            <p className='all-para'>{extractedText}</p>
                          </div>
                        </>
                      )
                    })}

                  </div>


                  <div className="row">
                    <a href='/blog' style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                      <div className="col-md-12 view-more">
                        <button type="submit" className="btn btn-news">View All Posts</button>
                      </div>
                    </a>
                  </div>
                </div>

                {/* *************STAY INFORMED*************** */}
                <div className="container-fluid newsletter" style={{ backgroundImage: `url(/uploads/${item.sec9bgimg})` }}>
                  <div className="container">

                    <h1 id="all-main-heading">{item.sec9heading}</h1>
                  <h3 id="stay-text" style={{textAlign:"center", color:"#fff"}}>{renderWithLineBreaks(item.sec9discription)}</h3>

                    <form action="/action_page.php" className="validated">
                      <div className="row ">
                        <div className="col-md-9">
                          <input onChange={(e) => setSubemail(e.target.value)} type="email" className="form-control mb-3" id="emailAdress" placeholder="Email address" name="emailAdress" style={{ borderRadius: "0px" }} required />
                          <div className="checkandmate">


                            <input type="checkbox" id="myCheck" name="remember" checked={isChecked} onChange={handleCheckboxChange} required />
                            <label className="form-check-label ml-2" htmlFor="myCheck" id="check-text" >
                              I agree to the terms & privacy policy.
                            </label>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <button type="submit" className="bg-light-grey" style={{ borderRadius: "0px",marginTop:"0px" }} onClick={SubscribeEmailGet}>{item.sec9button}</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </>
          )
        })}

      
        <WhatsappChat />
        {/* Owl Carousel */}
      </div>
    </>
  );
};

export default Main;
