import React, { useEffect, useState } from "react";
import '../../styles/about/about.css'
import Form from 'react-bootstrap/Form';
import Countries from '../CommonElements/CountryInfo';
import { Dropdown } from "react-bootstrap";
import { createNotification } from '../Notification/Notification';
import { ToastContainer } from "react-toastify";
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { IoSettingsOutline } from "react-icons/io5";
import { LuHotel } from "react-icons/lu";
import { MdOutlineLocalHotel } from "react-icons/md";

const About = () => {
    const [selectedCountry, setSelectedCountry] = useState(Countries[1]);

    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("");
    const dialCode = selectedCountry.phone[0];
    const [moreclicked, setmoreclicked] = useState(false)


    function MoreAbout() {
        setmoreclicked(true);
        const btn = document.getElementById('moreabout');
        btn.style.visibility = 'hidden';
    }

    function CloseMoreAbout() {
        const openbtn = document.getElementById('moreabout');
        const closebtn = document.getElementById('closemoreabout');
        openbtn.style.visibility = 'visible';
        closebtn.style.visibility = 'hidden';
        setmoreclicked(false);

    }

    const handleCountrySelect = (item) => {
        setSelectedCountry(item);
    };
    const [isCheckedone, setIsCheckedone] = useState(false);
    const [isCheckedtwo, setIsCheckedtwo] = useState(false);

    const handleCheckboxChange1 = (event) => {
        setIsCheckedone(event.target.checked);
    };
    const handleCheckboxChange2 = (event) => {
        setIsCheckedtwo(event.target.checked);
    };
    const about = "About";
    function Aboutsubmit(e) {
        e.preventDefault();
        if (isCheckedone === true && isCheckedtwo === true) {
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
        else {
            createNotification("warning", "Please Click on Agree for Further Processing");
        }
    }

    const [data, setdata] = useState([])

    useEffect(() => {
        const name = "aboutuspagedb"
	     const aboutdb = {"tablename" : "aboutuspagedb"}
          axios.post(`http://localhost:4000/staticdata` , aboutdb).then((res) => {
            setdata(res.data);
        })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);

    return (
        <>
            <ToastContainer />
            {data.map((item, index) => {
                return (
                    <>
                        <section className="about-ban" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
                            <div className='' id='main-banner-div'>
                                <h2 className='main-banner-heading' >{item.sec1heading}</h2>
                                <p id='main-banner-subdetails' style={{ width: '650px' }}>{item.sec1discription}</p>
                            </div>
                        </section>

                        <div id='about-parent-div' >
                            {/* *********About Us********** */}


                            <div className='main-about-div' style={{ margin: "auto" }}>


                                <div className='pt-3 about-us-details' >
                                    <p className='mb-2 all-para' >{item.sec2discription}</p>
                                </div>

                                {/* {moreclicked && <>
                                    <div className='about-us-details-more'>
                                        <p className='all-para'>
                                            At Raine & Horne, our success is built on a foundation of trust and transparency.
                                            Our team of dedicated professionals is committed to establishing lasting relationships with our clients,
                                            ensuring they receive the highest level of service and expertise.
                                        </p>

                                        <p className='all-para'>
                                            Our commitment to excellence has earned us numerous accolades and partnerships within the real estate industry.
                                            We have proudly partnered with leading developers, including Emaar, DAMAC, Danube, Ellington, SOBHA, Dubai Holding and Nakheel.
                                            Additionally, we are featured on prominent listing platforms such as Bayut, Property Finder and Dubizzle.
                                        </p>

                                        <p className='all-para'>
                                            Raine & Horne is more than just a real estate company; we are a trusted partner on your real estate journey.
                                            With a legacy of success and a vision for the future, we continue to exceed expectations and provide top-tier real estate services to our clients.
                                        </p>
                                        <p id='closemoreabout' onClick={CloseMoreAbout}>close</p>
                                    </div>
                                </>
                                } */}

                            </div>

                            {/* ******************OUR VISION*************** */}

                            <div className='row p-0 align-items-center' style={{ width: "87%", margin: "auto", marginTop: "80px" }}>
                                <div className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6'>
                                    <h1 className='all-main-heading'>{item.sec3heading}</h1>
                                    <h6 className='all-sub-heading' style={{ textAlign: 'left' }}>{item.sec3subheading1}</h6>
                                    <p className='all-para' >{item.sec3discription1}
                                    </p>
                                    <h6 className='mb-3 all-sub-heading' style={{ textAlign: 'left' }}>{item.sec3subheading2}</h6>
                                    <p className='all-para' >{item.sec3discription2}</p>
                                </div>
                                <div className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-6' >
                                    <img src={`/uploads/${item.sec3image}`} alt="top-look" id='our-v-m-img' />
                                </div>

                            </div>
                            {/* *********************Out Clients************************ */}


                            <div className='' style={{ width: "87%", margin: "auto", marginTop: '100px' }}>

                                <MDBRow className='row justify-content-between'>

                                    <MDBCol className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4' >
                                        <MDBCard className='main-cards'>
                                            <div className='blue-round-content'>
                                                <h2 className='text-white'>{item.sec4number1}</h2>
                                            </div>
                                            <MDBCardBody className='card-body-aboutus'>
                                                <MDBCardTitle><h1 className='all-main-heading'>{item.sec4heading1}</h1></MDBCardTitle>
                                                <MDBCardText className='mt-3 all-para'>
                                                    {item.sec4discription1}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>

                                    <MDBCol className='col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4' >
                                        <MDBCard className='main-cards'>
                                            <div className='blue-round-content' >
                                                <h2 className='text-white'>{item.sec4number2}+</h2>
                                            </div>
                                            <MDBCardBody className='card-body-aboutus'>
                                                <MDBCardTitle><h3 className='all-main-heading'>{item.sec4heading2}</h3></MDBCardTitle>
                                                <MDBCardText className='mt-3 all-para'>
                                                    {item.sec4discription2}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>

                                    <MDBCol className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4' >
                                        <MDBCard className='main-cards'>
                                            <div className='blue-round-content' >
                                                <h2 className='text-white'>{item.sec4number3}</h2>
                                            </div>
                                            <MDBCardBody className='card-body-aboutus'>
                                                <MDBCardTitle><h3 className='all-main-heading'>{item.sec4heading3}</h3></MDBCardTitle>
                                                <MDBCardText className='mt-3 all-para'>
                                                    {item.sec4discription3}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </div>


                            {/* **********************our services********************* */}
                            <div className='row text-center' style={{ width: '87%', margin: 'auto', marginTop: '120px' }} >

                                <div className='col-12'>
                                    <h1 className='all-main-heading my-8 mb-20'> Our Services</h1>
                                </div>


                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <a href='/commercial' style={{ textDecoration: 'none' }}>
                                        <img alt="top-look" src={`uploads/${item.sec5icon}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                        <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription}</h3>
                                    </a>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <a href='/property&management' style={{ textDecoration: 'none' }}>
                                        <img alt="top-look" src={`uploads/${item.sec5icon2}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                        <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription2}</h3>
                                    </a>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <a href='https://www.rhvacations.ae' style={{ textDecoration: 'none' }}>
                                        <img alt="top-look" src={`uploads/${item.sec5icon3}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                        <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription3}</h3>
                                    </a>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>

                                    <img alt="top-look" src={`uploads/${item.sec5icon4}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                    <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription4}</h3>

                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <a href='/mortgageservices' style={{ textDecoration: 'none' }}>
                                        <img alt="top-look" src={`uploads/${item.sec5icon5}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                        <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription5}</h3>
                                    </a>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <a href='/advisory' style={{ textDecoration: 'none' }}>
                                        <img alt="top-look" src={`uploads/${item.sec5icon6}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                        <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription6}</h3>
                                    </a>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <img alt="top-look" src={`uploads/${item.sec5icon7}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                    <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription7}</h3>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <img alt="top-look" src={`uploads/${item.sec5icon8}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                    <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription8}</h3>
                                </div>

                                <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 our-services'>
                                    <img alt="top-look" src={`uploads/${item.sec5icon9}`} className='h-36 w-36 -mt-20 mr-auto ml-auto' style={{ borderRadius: '100px' }} />
                                    <h3 className='all-sub-heading' style={{ fontSize: '25px' }}>{item.sec5discription9}</h3>
                                </div>

                            </div>
                            <hr />

                            {/* **********************contact card***************************** */}
                            <div className="container property-form my-20" style={{ width: "50%", margn: "auto" }}>
                                <div className="container">

                                    <div className="form-title">
                                        <h3 className="center all-main-heading">{item.sec6heading}</h3>

                                        <p id="seel-property-para-thinking">
                                            {item.sec6discription}
                                        </p>
                                    </div>

                                </div>

                                <div className="container"  >
                                    <div className="row" >
                                        <div className="col-md-12 col-sm-7 col-xs-12" >

                                            <form action="#" style={{ magin: "auto", paddingLeft: "10px", paddingRight: "10px", marginBottom: "50px" }}>

                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="name" placeholder="Full Name*" onChange={(e) => setName(e.target.value)} required />
                                                </div>

                                                <div className="form-group">
                                                    <input type="email" className="form-control contcolor" id="mail" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} required />
                                                </div>

                                                <div className="form-group" style={{ position: "relative" }}>

                                                    <Dropdown style={{ width: "80px", position: "absolute" }}>

                                                        <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "60px", marginTop: "4.5px", border: "none" }}>
                                                            <img src={selectedCountry.image} alt="top-look" />
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

                                                    <input type="phone" className="form-control contcolor" placeholder="Phone No.*" onChange={(e) => setPhoneNumber(e.target.value)} required style={{ left: "160px", paddingLeft: "80px", paddingTop: "5px" }} />
                                                </div>

                                                <Form.Group className="form-group row" style={{ paddingLeft: '10px', height: '50px', color: "#4e5158", marginTop: '10px' }}>

                                                    <div className='col-1 p-0' style={{ paddingTop: '0px' }}>
                                                        <input type='checkbox' style={{ height: '15px', width: '15px', marginTop: '-4px' }} onChange={handleCheckboxChange1}
                                                            checked={isCheckedone} />
                                                        {/* <Checkbox inputProps={{ 'aria-label': 'Checkbox demo ok', paddingTop: '0px' }} /> */}
                                                    </div>

                                                    <div className='col-11 -mt-3 ' style={{ fontSize: '14px', paddingTop: '12px', marginLeft: '-15px' }}>
                                                        <p style={{ textAlign: 'left' }}> {item.sec6chackboxtext1}</p>
                                                    </div>
                                                </Form.Group>

                                                <Form.Group className="form-group row" style={{ paddingLeft: '10px', color: "#4e5158", marginTop: '-30px' }}>

                                                    <div className='col-1 p-0' >
                                                        <input type='checkbox' style={{ height: '15px', width: '15px', marginTop: '-10px' }} onChange={handleCheckboxChange2}
                                                            checked={isCheckedtwo} />
                                                        {/* <Checkbox inputProps={{ 'aria-label': 'Checkbox demo ok' }} /> */}
                                                    </div>
                                                    <div className='col-11' style={{ fontSize: '14px', paddingTop: '8px', marginLeft: '-15px' }}>
                                                        <p style={{ textAlign: 'left', maxWidth: '320px' }}>{item.sec6chackboxtext2}</p>
                                                    </div>

                                                </Form.Group>

                                                <div className="form-group pl-1" style={{ height: '60px', marginTop: '20px' }}>
                                                    <button type="submit" className="btn btn-secondary" style={{ marginTop: '10px' }} onClick={Aboutsubmit}>{item.sec6button}</button>
                                                </div>

                                            </form>
                                        </div>



                                    </div>
                                </div>
                            </div>


                        </div >
                    </>
                )
            })}

        </>
    )
}

export default About
