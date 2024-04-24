import React, { useState, useEffect } from "react";
import Countries from "../CommonElements/CountryInfo";
import { Dropdown } from "react-bootstrap";
import '../../styles/banner/banner.css'
import { AiFillPhone } from 'react-icons/ai'
import { AiTwotoneMail } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import { createNotification } from "../Notification/Notification";
import '../../styles/contact/contact.css'

const Contact = () => {

  const [data, setdata] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const dialCode = selectedCountry.phone[0];
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };

  const about = "Contact";
  function Aboutsubmit(e) {
    e.preventDefault();

    let data = { 'phoneNumber': phoneNumber, 'dialCode': dialCode, 'name': name, 'Email': Email, "about": about };
    axios.post(`http://localhost:4000/common`, data).then((res) => {
      console.log(res.status, "status")
      if (res.status === 200) {
        // alert("Userinfo  is Uploaded Sucessfully");
        createNotification("success", "Data is Added Sucessfully");
      } else {
        // alert("Userinfo is already present!");
        createNotification("warning", "Data is Already Present!");
      }
    });
  }

  useEffect(() => {
    const tablename = "contactuspagedb"
   const conus = {"tablename" : "contactuspagedb"};
          axios.post(`http://localhost:4000/staticdata` , conus).then((res) => {
      setdata(res.data)
    })
  }, []);

  return (
    <div>
      <ToastContainer />
      {data.map((item, index) => {
        console.log(item);
        return (
          <>
            <section className="cont-back" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
              <div className='' id='main-banner-div'>
                <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                <p id='main-banner-subdetails' style={{ width: '650px' }}>
                {item.sec1discription}
                   </p>
              </div>
            </section>


            {/* ******************************3 Divs**************************** */}
            <section className="section-contactboxes" style={{ width: '87%', margin: 'auto', marginTop: '100px' }}>
          
		  <div className="container" style={{ paddingRight: "30px" }}>
                <div className="row justify-content-between">

                  <div className="col-md-4 cont-txt " style={{borderRadius : "0px" }}>
                    <div className="icon">
                      <AiFillPhone style={{ margin: "auto", fontSize: "2rem" }} />
                     
                    </div>
                    <h2 className="all-main-heading" style={{ fontSize: '30px' }}>{item.sec2calltitle}</h2>
                    <a href="tel:+91-8699642180"> {item.sec2callnumber}</a><br />
                  </div>

                  <div className="col-md-4 cont-txt " style={{borderRadius : "0px" }}>
                    <div className="icon">
                      <AiTwotoneMail style={{ margin: "auto", fontSize: "2rem" }} />
                    </div>
                    <h2 className="all-main-heading" style={{ fontSize: '30px' }}>{item.sec2emailtitle}</h2>
                    <a href="mailto:info@rapidsmartsoftwares.com">{item.sec2emailaddress}</a>
                  </div>

                  <div className="col-md-4 cont-txt " style={{borderRadius : "0px" }}>
                    <div className="icon">
                      <GoLocation style={{ margin: "auto", fontSize: "2rem" }} />
                    </div>
                    <h2 className="all-main-heading" style={{ fontSize: '30px' }}>{item.sec2locationtitle}</h2>
                    <a href="address">{item.sec2locationaddress} </a>
                  </div>

                </div>
              </div>
            </section>

            {/* ******************************Form And Map**************************** */}
            <section className="ftco-section" style={{ width: "87%", margin: "auto", marginTop: "100px", marginBottom: "60px" }}>
              <div className="container">

                <div className="">
                  <h2 className="text-center all-main-heading">{item.sec2officehourstitle}</h2>

                  <p className="all-para" style={{ textAlign: "center", maxWidth: '600px', margin: 'auto' }}>
                   {item.sec2officehoursdiscription}
                  </p>
                </div>

                <div className="row" style={{ border: "1px solid #e9e9e9", padding: "30px", marginTop: "50px" }}>
                  <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ paddingTop: "30px" }}>

                    <form id="formContact" action="#">
                      <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="Full Name*" required style={{ width: "100%" }} onChange={(e) => setName(e.target.value)} />
                      </div>

                      <div className="form-group">
                        <input type="email" className="form-control contcolor" id="mail" placeholder="Email*" style={{ width: "100%" }} onChange={(e) => setEmail(e.target.value)} required />
                      </div>

                      <div className="form-group" style={{ position: "relative" }}>
                        <Dropdown style={{ width: "80px", position: "absolute" }}>
                          <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "60px", marginTop: "4.5px", border: "none" }}>
                            <img src={selectedCountry.image} alt="" />
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

                        <input type="phone" className="form-control contcolor" placeholder="Phone No.*" onChange={(e) => setPhoneNumber(e.target.value)} required
                          style={{ left: "90px", paddingLeft: "90px", paddingTop: "5px", width: "100%" }} />
                      </div>

                      {/* <div className="form-group pl-1" style={{ marginTop: "10px }}> */}
                      <button type="submit" onClick={Aboutsubmit} className="btn btn-secondary" style={{ marginTop: '20px' }}>{item.sec4button}</button>
                      {/* </div> */}
                    </form>

                  </div>

                  <div className="col-6">
                    <div id="map" style={{ height: "100%", width: "100%" }}>
                      <iframe
                        src="https://www.google.com/maps/embed?                                                           pb=!1m18!1m12!1m3!1d3430.6919602279318!2d76.68775777537162!3d30.698941974600714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef52a67a250d%3A0x374db9604765f795!2sJapnaaz%20Software%20Pvt%20LTD!5e0!3m2!1sen!2sin!4v1698819418656!5m2!1sen!2sin"
                        title="property" style={{ border: "0", height: "100%", width: "100%" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </>
        )
      })}



    </div>
  );
};

export default Contact;