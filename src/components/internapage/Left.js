import React from "react";
// import "../../styles/main/leftcomp.css";
import '../../styles/internal/left.css'
import Button from "react-bootstrap/Button";
import { MdPhotoSizeSelectSmall } from "react-icons/md";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { CiParking1 } from "react-icons/ci";
import { MdOutlineVilla } from "react-icons/md";
import { useState, useEffect } from "react";
import Countries from "../CommonElements/CountryInfo";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createNotification } from "../Notification/Notification";

function Addition() {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState('');
  const [name,setName]=useState('');
  const createMarkup = (html) => ({ __html: html });

  function readData() {
    setClicked(false);
  }

  function readDataTwo() {
    setClicked(true);
  }

  useEffect(() => {
    const id = localStorage.getItem('propertyid');
    axios
      .get(`http://localhost:4000/singleproperty1/${id}`)
      .then((res) => {
        console.log(res.data[0], "data of 0");
        setData(res.data[0].Property_Name);
		 setName(res.data[0].Web_Remarks)
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  return (
    <>
      <div>
        {clicked === false ?
          <>
            <div>
		   <h1 className="mt-3" id="propert-heading">
              {name}
            </h1>
              <div style={{ height: '120px', overflow: 'hidden' }}>
                <div className="all-para fontclassforinternal" style={{fontSize:"16px"}} dangerouslySetInnerHTML={createMarkup(data)} />
																
              </div>
              <p onClick={readDataTwo} className="float-right" id="read">read more</p>
            </div>
          </>
          :
          <>
            <div>
              <div style={{ overflow: 'hidden' }}>
                <div className="all-para fontclassforinternal" style={{fontSize:"16px"}} dangerouslySetInnerHTML={createMarkup(data)} />
                <p onClick={readData} className="float-right" id="read">read less</p>
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
}


const LeftComponent = () => {

  const [page, setpage] = useState('')
  const [singledata, setdata] = useState([])
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [featured,setFeatured]=useState("");
       const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
      const [more, setMore] = useState(false);
      const [phoneNumber, setPhoneNumber] = useState("");
      const [name, setName] = useState('');
      const [Email, setEmail] = useState('');
   const [PropertyName,setPropertyName]=useState('');
  const dialCode = selectedCountry.phone[0];
  function formatNumberWithCommas(number) {
    const formattedNumber = Number(number).toFixed(2);

    return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    const id = localStorage.getItem('propertyid');
	  const pagename = localStorage.getItem("whichpage");
        setpage(pagename);
    axios
      .get(`http://localhost:4000/singleproperty1/${id}`)
      .then((res) => {
        setdata(res.data);
        setlongitude(res.data[0].Longitude);
        setlatitude(res.data[0].Latitude);
		setPropertyName(res.data[0].Property_Name);
		 setFeatured(res.data[0].Featured);
        const pagename = localStorage.getItem("whichpage");
        setpage(pagename);
        const price = res.data[0].Price;
        localStorage.setItem('price', price);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
	  });
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      const id = document.getElementById('iframeId');
      const ltd = parseFloat(longitude);
      const longi = parseFloat(latitude);

      id.src = `https://maps.google.com/maps?q=${longi},${ltd}&hl=es;&output=embed`;
    }
  }, [longitude]);


  useEffect(() => {
    setMore(false);
  }, [more]);

  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };

 const about = "Internal";
  function Aboutsubmit(e) {
    e.preventDefault();
 
    if(phoneNumber && name &&  Email && dialCode){
	  let data = { 'phoneNumber': phoneNumber, 'dialCode': dialCode, 'name': name, 'Email': Email,"PropertyName":PropertyName, "page": page};
console.log(data);
    axios.post(`http://localhost:4000/FormInternal`, data).then((res) => {
      if (res.status === 200) {
		  console.log("dtaa",res.status)
        
        createNotification("success", "Data is Added Sucessfully");
      } else {
   
        createNotification("warning", "Data is Already Present!");
      }
    });
	}
	  else{
		   createNotification("warning", "Please Enter Valid Details!");
	  }
	  
  }

  return (

    <div id="left-main-div" style={{ paddingLeft: '0px' }}>
	  <ToastContainer/>
      {singledata.map((item, key) => {
        const fac = JSON.parse(item.Facilities)
		
        return (
          <>

            <div id="" className="row mt-1 pt-2">

              <span className="mt-1 col-6 mb-3" id="price-per-month">
                <strong style={{ fontSize: '25px' }}>AED {formatNumberWithCommas(item.Price)}</strong>
              </span>
            </div>

            {page === 'buy' ?
              <>
                <Button id="for-rent-sale">For Buy</Button>
              </>
              :
              <Button id="for-rent-sale">For Rent</Button>
            }
            {/* *********************Property Name*********************** */}
    <h1 className="mt-3" id="propert-heading">
       
            </h1>




            {/* *********************Property All Details*********************** */}
            <Addition />

            <hr className="mt-4" />

            {/* *********************Property Basic Info*********************** */}

            <div className="my-8">
              <h3 className="mt-4" style={{ fontWeight: "500" }}>Property details</h3>

              <div className="row mt-4" style={{ width: "100%", margin: "auto" }}>

                <div className="col-6">

                  <div className="row">
                    <div className="col-2">

                      <MdPhotoSizeSelectSmall style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">

                      <p >Size: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">
                        {item.Unit_Builtup_Area} <span>sq.ft</span>
                      </span>
                    </div>
                  </div>

                  <hr />
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-2">

                      <MdOutlineBed style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">

                      <p>Bedrooms: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">{item.Bedrooms}</span>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-2">

                      <PiBathtub style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">

                      <p>Bathrooms: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">{item.No_of_Bathroom}</span>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-2">

                      <GoHome style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">

                      <p>Rooms: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">{item.No_of_Rooms}</span>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-2">

                      <CiParking1 style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">
                      <p>Parking: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">{item.Parking}</span>
                    </div>
                  </div>
                  <hr/>
                </div>

                <div className="col-6">
                  <div className="row">
                    <div className="col-2">

                      <MdOutlineVilla style={{marginTop:"3px"}} />
                    </div>
                    <div className="col-4 internal-basic-info">

                      <p>Unit: </p>
                    </div>
                    <div className="col-6 text-end">

                      <span className="">{item.Unit_Type}</span>
                    </div>
                  </div>
                  <hr />
                </div>

              </div>
            </div>

           {/* *********************Property Featured*********************** */}
             <div className="my-8">
  {featured === 1 && (
    <>
      <h3 style={{ fontWeight: "500", marginTop: '50px' }}>Property Features</h3>
      {fac.map((item, index) => (
        <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4 h-12">
          <li className="" style={{ height: '50px' }}>
            <p className="" style={{ marginLeft: '25px', marginTop: '-20px' }}>{item}</p>
          </li>
          <hr style={{ marginTop: '-10px' }} />
        </div>
      ))}
    </>
  )}
</div>


            {/* ***********Location*************** */}
            <div className="mt-5">
              <h3 className="">Location</h3>
              <p>{item.Community} , {item.Emirate}</p>
              {/* <p className="-mt-3"></p> */}

              <div>

                <iframe id='iframeId' height='400px' width='100%' title="property-loaction"></iframe>
              </div>
            </div>


            <hr className="mt-3" />

            {/* ***********Inquery Form*************** */}
                <div className="container property-form" id="sale-container" style={{ width: "87%", margin: "auto", marginBottom: "60px",                          backgroundColor: "#fff", marginTop:"30px" }}>
              <h2 style={{marginTop:"40px"}} id='list-property'>Contact Us</h2>
       
              <div className="container mt-6">

                <form action="#" className='row'>

                  <div className="form-group col-12">
                    <input style={{ width: "100%", marginBottom: "10px" }} type="text" id="name" placeholder="Full name*" name="name" required onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="form-group col-12">
                    <input style={{ width: "100%", marginBottom: "10px",borderRadius:"0px !important" }} type="email" className="form-control" id="mail" placeholder="Email*"  required
    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="form-group col-12" style={{ position: "relative" }}>

                    <Dropdown style={{ position: "absolute",  borderRight: "1px solid #ddd", height: "50px" }}>
                   

                              <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center" ,justifyContent: "space-between"}}>
    <img src={selectedCountry.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
    <p style={{ marginLeft: "50px" }}>{dialCode}</p>
  </div>
  <span className="caret"></span>
</Dropdown.Toggle>

                      <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }} >
                        {Countries.map((item) => (
                          <Dropdown.Item onClick={() => handleCountrySelect(item)}>
                            <div id="image-code">
                              <img src={item.image} alt={item.name} style={{ width: "30px", height: "30px" }} />
                              <p className="ml-3 mt-1">{item.name} {item.phone && item.phone.length > 0 ? item.phone[0] : "N/A"}</p>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required
                      style={{ left: "90px", paddingLeft: "160px", paddingTop: "5px", width: "100%",height:"50px" }} />
                  </div>

                  <div className="form-group col-12" style={{ marginBottom: "40px" }}>
                    <button type="submit" className="btn btn-secondary ml-1" id="sellbtn" onClick={Aboutsubmit}>Submit</button>
                  </div>
                </form>

              </div>
            </div>
          </>
        )
      })}
    </div >


  );
};

export default LeftComponent;