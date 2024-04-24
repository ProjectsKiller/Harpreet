import React from 'react'
import '../../styles/advisery/advisery.css'
import '../../styles/main/common.css'
import Countries from '../CommonElements/CountryInfo';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { createNotification } from "../Notification/Notification";

const Advisory = () => {
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [more, setMore] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const dialCode = selectedCountry.phone[0];

  const [data, setdata] = useState([])

  useEffect(() => {
    const name = "advisorypagedb"
	const adv = {"tablename" : "advisorypagedb"}
        axios.post(`http://localhost:4000/staticdata` , adv).then((res) => {
        setdata(res.data);
    })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);


  useEffect(() => {
    setMore(false);
  }, [more]);

  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };


  const about = "Advisory";
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


  return (
    <div id='advisory-main' className='mb-12' >

      {data.map((item, index) => {
        return (
          <>

            {/* *******************Header*****************************/}

            <section className="advisory-ban" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
              <div className='' id='main-banner-div'>
                <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                <p id='main-banner-subdetails' style={{ width: '650px' }}>{item.sec1discription}</p>
              </div>
            </section>

            {/* *******************Other Section*****************************/}

            <section id="about">
              <div className="container">

                <div className="row mt-5">

                  <div className="col-lg-6 py-5">
                    <ul className="market" style={{ textAlign: 'left', padding: '0px' }} >
                      <h1 className="text-capitalize all-main-heading my-3">{item.sec2heading}</h1>
                      <li>
                        <h5 className='all-sub-heading' style={{ textAlign: 'left' }}>{item.sec2subheading1}</h5>
                        <p className='all-para'>{item.sec2discription1}</p>
                      </li>
                      <li>
                        <h5 className='all-sub-heading' style={{ textAlign: 'left' }}>{item.sec2subheading2} </h5>
                        <p className='all-para'>{item.sec2discription2}</p>
                      </li>
                      <li>
                        {' '}
                        <h5 className='all-sub-heading' style={{ textAlign: 'left' }}>{item.sec2subheading3}</h5>
                        <p className='all-para'>{item.sec2discription3}</p>
                      </li>
                      <li>
                        <h5 className='all-sub-heading' style={{ textAlign: 'left' }}>{item.sec2subheading4}</h5>
                        <p className='all-para'>{item.sec2discription4}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-6 py-5">
                    <img src={`uploads/${item.sec2image}`} alt="" style={{ height: '381px', width: '580px' }} />
                  </div>

                </div>
              </div>
            </section>

            {/* *******************Our Services*****************************/}

            <div className="container my-5">


              <div className="row why-box">

                <div className="col-lg-6 col-xs-12">
                  <img src={`uploads/${item.sec3image}`} className="img-fluid" alt="" style={{ height: '381px', width: '580px' }} />
                </div>

                <div className="col-lg-6 common-advisory-divs col-xs-12" >
                  <ul className="list-advisory all-sub-heading centerd" style={{ textAlign: 'left' }}>
                    <h1 className="text-capitalize all-main-heading">{item.sec3heading}</h1>
                    <li>{item.sec3subheading1}</li>
                    <li>{item.sec3subheading2}</li>
                    <li>{item.sec3subheading3}</li>
                    <li>{item.sec3subheading4}</li>
                    <li>{item.sec3subheading5}</li>
                  </ul>

                </div>
              </div>
            </div>


            {/* *******************Why Us*****************************/}

            <section className="why-us">
              <div className="container">

                <div className="row why-box">
                  <div className="col-lg-6 common-advisory-divs  col-xs-12">
                    <ul className="why-list all-sub-heading centerd" style={{ textAlign: 'left' }}>
                      <h1 className="text-capitalize all-main-heading">{item.sec4heading}</h1>
                      <li>{item.sec4subheading1}</li>
                      <li>{item.sec4subheading2}</li>
                      <li>{item.sec4subheading3}</li>
                      <li>{item.sec4subheading4}</li>
                      <li>{item.sec4subheading5}</li>
                    </ul>
                  </div>

                  <div className="col-lg-6  col-xs-12">
                    <img src={`uploads/${item.sec4image}`} alt="" style={{ height: '381px', width: '580px' }} />
                  </div>
                </div>
              </div>
            </section>


            {/* *******************Contact Form*****************************/}

            <div className="container property-form my-20" style={{ width: "50%", margn: "auto" }}>

              <h2 className="mt-5" id='list-property'>{item.sec5heading}</h2>


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
                        <button type="submit" className="btn btn-secondary ml-1" id="sellbtn" onClick={Aboutsubmit}>{item.sec5button}</button>
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
  )
}

export default Advisory
