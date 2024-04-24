import React from 'react'
import '../../styles/main/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/banner/banner.css'
import '../../styles/about/about.css'
import Countries from '../CommonElements/CountryInfo';
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { createNotification } from "../Notification/Notification";

const PropMan = () => {
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [more, setMore] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const dialCode = selectedCountry.phone[0];

  useEffect(() => {
    setMore(false);
  }, [more]);

  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };


  const about = "Property Management";
  function Aboutsubmit(e) {
    e.preventDefault();

    if (phoneNumber && name && Email && about) {
      let data = { 'phoneNumber': phoneNumber, 'dialCode': dialCode, 'name': name, 'Email': Email, "about": about };
      axios.post(`http://localhost:4000/common`, data).then((res) => {
        if (res.status === 200) {
          // alert("Userinfo  is Uploaded Sucessfully");
          createNotification("success", "Data is Added Sucessfully");
        } else {
          // alert("Userinfo is already present!");
          createNotification("warning", "Data is Already Present!");
        }
      });
    }
    else {
      createNotification("warning", "Please Enter Valid Details!");
    }
  }

  const [data, setdata] = useState([])
  useEffect(() => {
    const name = "propertymanagementpagedb"
     const pmanage = {"tablename" : "propertymanagementpagedb"};
          axios.post(`http://localhost:4000/staticdata` , pmanage).then((res) => {
      setdata(res.data);
    })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  return (
    <>
      <div>
        {data.map((item, index) => {
          return (
            <>
              <section className="propertymanagment-ban" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
                <div className='' id='main-banner-div'>
                  <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                  <p id='main-banner-subdetails' style={{ width: '600px' }}>
                    {item.sec1discription}
                  </p>
                </div>
              </section>


              {/* ********************************Image And Details************************* */}
              <section className="choose" >
                <div className="container">
                  <div className="row">

                    <div className="col-lg-6 pr-5">
                      <p className='property-m-details all-para'>
                        {item.sec2discription}
                      </p>
                    </div>

                    <div className="col-lg-6" >
                      <img src={`uploads/${item.sec2image}`} alt="" style={{ height: '350px', width: '580px', float: 'right' }} />
                    </div>

                  </div>
                </div>
              </section>

              {/* ******************************Form******************************** */}
              <div className="container property-form my-20" style={{ width: "50%", margn: "auto" }}>
                <div className="container">

                  <div className="form-title">
                    <h2 className="mt-4" id='list-property'>{item.sec3heading}</h2>

                    <p id="seel-property-para-thinking" style={{ paddingLeft: '30px', paddingRight: '30px', width: '660px' }}>
                      {item.sec3discription}
                    </p>
                  </div>

                </div>

                <div className="container"  >
                  <div className="row" >
                    <div className="col-md-12 col-sm-7 col-xs-12" >

                      <form action="#" style={{ magin: "auto", paddingLeft: "10px", paddingRight: "10px", marginBottom: "130px" }}>

                        <div className="form-group col-12">
                          <input style={{ width: "100%", marginBottom: "10px" }} type="text" id="name" placeholder="Full name*" name="name" required onChange={(e) => setName(e.target.value)} />
                        </div>


                        <div className="form-group col-12">
                          <input style={{ width: "100%", marginBottom: "10px" }} type="email" className="form-control" id="mail" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group" style={{ position: "relative" }}>

                          <Dropdown style={{ width: "80px", position: "absolute" }}>

                            <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "60px", marginTop: "4.5px", border: "none" }}>
                              <img src={selectedCountry.image} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ height: "200px", overflow: "auto" }}>

                              {Countries.map((item) => {
                                return (

                                  <Dropdown.Item onClick={() => handleCountrySelect(item)}>
                                    <div id="image-code">
                                      <img src={item.image} alt={item.name} style={{ width: "30px", height: "30px" }} />
                                      <p className="ml-5 mt-1">{item.name}{item.phone && item.phone.length > 0 ? item.phone[0] : "N/A"}
                                      </p>
                                    </div>
                                  </Dropdown.Item>

                                );
                              })}
                            </Dropdown.Menu>

                          </Dropdown>

                          <input type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "80px", paddingTop: "5px" }} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div className="form-group col-12" style={{ marginBottom: "10px" }}>
                          <button type="submit" className="btn btn-secondary ml-1" id="sellbtn" onClick={Aboutsubmit}>{item.sec3button}</button>
                        </div>
                      </form>
                    </div>


                  </div>
                </div>
              </div>
            </>
          )
        })}


      </div>
    </>
  )
}

export default PropMan
