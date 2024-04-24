import React, { useState } from 'react'
import Countries from '../CommonElements/CountryInfo'
import '../../styles/sale/sale.css'
import { Dropdown } from "react-bootstrap";
import '../../styles/banner/banner.css'
import {TiArrowSortedDown} from 'react-icons/ti'

const Sale = () => {

    const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleCountrySelect = (item) => {
        setSelectedCountry(item);
    };

    return (

        <div id='sale-main' style={{}}>

            <section className="sale-ban">
                <div className='absolute' id='main-banner-div'>
                    <h2 className='main-banner-heading' style={{}}>  List Your Property</h2>
                    <p id='main-banner-subdetails' style={{ width: '650px' }}>
                        Unlock the potential of your property – list with us for a seamless, high-impact selling or renting experience.
                    </p>
                </div>
            </section>




            <div className='row' style={{ width: "87%", margin: "auto", paddingRight: "0px", marginTop: "60px" }}>
                <div className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-4' style={{ display: "flex" }}>
                    <div className='text-left' id='sale-div-det'>
                        <h2 className='all-main-heading'>Why list your property with Raine & Horne?</h2>
                        <p  className='text-justify all-para'>We have dedicated agents in your area,
                        register hundreds of buyers each week, provide top-tier property portal exposure, lead with 
                        effective SEO and PPC campaigns, engage with targeted audiences through social media, and offer
                         professional marketing services for captivating visuals to connect your property with interested parties.</p>
                    </div>
                </div>
                
                <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-8' style={{}}>
                    <img src="/images/mortgage.png" alt="" id='sale-div-image' />
                </div>

            </div>


            <div className="container property-form" id="sale-container" style={{ width: "87%", margin: "auto", marginBottom: "60px" }}>
                <h2 className="mt-5" id='list-property'>List Your Property</h2>
                <div className="container mt-6">
                    <form action="#" className='row'>
                        <div className="form-group col-md-6">
                            <input style={{ width: "100%", marginBottom: "10px" }} type="text" id="name" placeholder="Full name*" name="name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <input style={{ width: "100%", marginBottom: "10px" }} type="email" className="form-control" id="mail" placeholder="Email*" />
                        </div>

                        <div className="form-group col-md-6" style={{ position: "relative" }}>
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

                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required
                                style={{ left: "90px", paddingLeft: "90px", paddingTop: "5px", width: "100%" }} />
                        </div>
                        <div className="form-group col-md-6" style={{ marginBottom: "10px", position: "relative" }}>
                            <Dropdown style={{ width: "100%" }}>
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    className="custom-toggle"
                                    style={{
                                        border: "none",
                                        width: "100%",
                                        backgroundColor: "#fff",
                                        color: "#716e70",
                                        padding: "14px",
                                        paddingLeft: "25px",
                                        borderRadius: "30px",
                                        textAlign: "left",
                                        position: "relative",

                                    }}
                                >
                                    Sale
                                    <span
                                        className="arrow-right"
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            //   border:"2px solid red",
                                            color: "black",
                                            right: "10px",
                                            transform: "translateY(-50%)",
                                        }}
                                    >
                                        <TiArrowSortedDown />
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width: "100%" }}>
                                    <Dropdown.Item href="#/action-1">Sale</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Rent</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="form-group col-md-6" style={{ marginBottom: "10px", position: "relative" }}>
                            <Dropdown style={{ width: "100%" }}>
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    className="custom-toggle"
                                    style={{
                                        border: "none",
                                        width: "100%",
                                        backgroundColor: "#fff",
                                        color: "#716e70",
                                        padding: "14px",
                                        paddingLeft: "25px",
                                        borderRadius: "30px",
                                        textAlign: "left",
                                        position: "relative",

                                    }}
                                >
                                    Property type
                                    <span
                                        className="arrow-right"
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            //   border:"2px solid red",
                                            color: "black",
                                            right: "10px",
                                            transform: "translateY(-50%)",
                                        }}
                                    >
                                        <TiArrowSortedDown />
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ width: "100%" }}>
                                    <Dropdown.Item href="#/action-1">Apartment</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Villa</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Townhouse</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Land</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Warehouse</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">House</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Commercial</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                      
                        <div className="form-group col-md-6" style={{ marginBottom: "10px" }}>
                            <input style={{ width: "100%" }} type="text" className="form-control col-6 " id="address" placeholder="Location*" name="address" required />
                        </div>
                        <div className="form-group col-12" style={{ marginBottom: "10px" }}>
                            <button type="submit" className="btn btn-secondary ml-1" id="sellbtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>


            {/* ***************from********************* */}




        </div>
    )
}

