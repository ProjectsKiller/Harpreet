import React, { useEffect, useState } from "react";
import '../../styles/career/career.css'
import '../../styles/main/main.css'
import '../../styles/sale/sale.css'
import { Dropdown } from "react-bootstrap";
import '../../styles/banner/banner.css'
import { AiTwotoneMail } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import Countries from "../CommonElements/CountryInfo";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { createNotification } from "../Notification/Notification";
import { MdCall } from "react-icons/md";

const Career_At = () => {
  const [data, setdata] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const dialCode = selectedCountry.phone[0];
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };

  useEffect(() => {
    const tablename = "joinuspagedb"
    const joinus = {"tablename" : "joinuspagedb"};
          axios.post(`http://localhost:4000/staticdata` , joinus).then((res) => {
      setdata(res.data);
    })
  }, []);


  const about = "Join Us";
  function Aboutsubmit(e) {
    e.preventDefault();
    if (phoneNumber && name && Email && about) {
      let data = { 'phoneNumber': phoneNumber, 'dialCode': dialCode, 'name': name, 'Email': Email, "about": about };
      console.log(data);
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


  return (
    <div>
      {/* ************Newslatter***************** */}
      <ToastContainer />
      {data.map((item, index) => {
        return (
          <>
            <section className="career-ban" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
              <div className='' id='main-banner-div'>
                <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                <p id='main-banner-subdetails'>{item.sec1discription}</p>
              </div>
            </section>

            <main id="main" style={{ marginTop: "50px", marginBottom: "60px" }}>

              <section id="contact" class="contact">
                <div class="container">

                  <div class="row gy-5 gx-lg-5">

                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">

                      <div class="info mt-2 row">

                        <div class="info-item d-flex col-6 col-sm-6 col-md-6 col-lg-12 col-xl-12" >
                          {/* <AiFillPhone  style={{fontSize:'1.5rem'}}/> */}
                          <MdCall style={{ fontSize: '1.5rem' }} />
                          {/* <i class="bi bi-phone flex-shrink-0"></i> */}

                          <div className="ml-5">
                            <h4 className="all-sub-heading" style={{ textAlign: 'left' }}>{item.sec2calltitle}</h4>
                            <p className="all-para" >{item.sec2callnumber}</p>
                          </div>
                        </div>

                        <div class="info-item d-flex col-6 col-sm-6 col-md-6 col-lg-12 col-xl-12" >
                          {/* <i class="bi bi-envelope flex-shrink-0"></i> */}
                          <AiTwotoneMail style={{ fontSize: '1.5rem' }} />
                          <div className="ml-5">
                            <h4 className="all-sub-heading" style={{ textAlign: 'left', padding: '0px' }}>Email:</h4>
                            <p className="all-para" >{item.sec2emailaddress}</p>
                          </div>
                        </div>

                        <div class="info-item d-flex col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" >
                          {/* <i class="bi bi-clock flex-shrink-0"></i> */}
                          <GoLocation style={{ fontSize: '1.5rem' }} />
                          <div className="ml-5">
                            <h4 className="all-sub-heading" style={{ textAlign: 'left' }}>Office Hours:</h4>
                            <p className="all-para" > Monday - Friday:  {item.sec2officehoursmfopeningtime} - {item.sec2officehoursmfclosingtime} (GMT +4)<br /> Saturday: {item.sec2officehourssopeningtime} - {item.sec2officehourssclosingtime} (GMT +4) <br />Sunday - Closed</p>
                          </div>
                        </div>

                      </div>

                    </div>


                    <div className="container property-form col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6" style={{ margn: "auto", marginTop: "50px" }}>

                      <h2 className="mt-5" id='list-property'>{item.sec3heading}</h2>


                      <div className="container mt-6"  >
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


                  </div>

                </div>
              </section>
            </main>
          </>
        )
      })}


    </div>
  )
}

export default Career_At
