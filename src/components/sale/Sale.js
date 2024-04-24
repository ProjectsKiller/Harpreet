import React, { useEffect, useState } from "react";
import '../../styles/sale/sale.css'
import { Dropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import '../../styles/banner/banner.css'
import { TiArrowSortedDown } from 'react-icons/ti'
import Countries from '../CommonElements/CountryInfo';
import axios from 'axios'
import { createNotification } from '../Notification/Notification';

const Sale = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setdata] = useState([]);
    const [saleDrop, setDropVal] = useState('Sale');

    const [proType, setProtype] = useState('');
    const [location, setLocation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleCountrySelect = (item) => {
        setSelectedCountry(item);
    };


    const dialCode = selectedCountry.phone[0];
    function SaleForm(e) {
        e.preventDefault();
        if (name && email && saleDrop && location && proType && phoneNumber && dialCode) {

            let data = { "name": name, "email": email, "saleDrop": saleDrop, "location": location, "proType": proType, "phoneNumber": phoneNumber, "dialCode": dialCode }

            axios.post(`http://localhost:4000/saleform`, data).then((res) => {
                console.log(res.status, "status in Sale")
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


    useEffect(() => {
        const tablename = "sellpagedb"
		  const sell = {"tablename" : "sellpagedb"};
          axios.post(`http://localhost:4000/staticdata` , sell).then((res) => {
            console.log(res.data);
            setdata(res.data);
        })
    }, []);

    return (

        <div id='sale-main'>
            <ToastContainer />
            {data.map((item, index) => {
                return (
                    <>
                        <section className="sale-ban" style={{ backgroundImage: `url(/uploads/${item.sec1bgimage})` }}>
                            <div className='absolute' id='main-banner-div'>
                                <h2 className='main-banner-heading'>{item.sec1heading}</h2>
                                <p id='main-banner-subdetails'>{item.sec1discription}</p>
                            </div>
                        </section>


                        <div className="container property-form" id="sale-container" style={{ width: "87%", margin: "auto", marginTop: "60px", backgroundColor: "#fff" }}>
                            <h2 className="mt-5" id='list-property'>{item.sec2heading}</h2>
                            <div className="container mt-6">

                                <form action="#" className='row' style={{ marginBottom: "40px", paddingLeft: "10px", paddingRight: "10px" }}>

                                    <div className="form-group col-md-6">
                                        <input style={{ width: "100%", marginBottom: "10px" }} type="text" id="name" placeholder="Full name*"                                           name="name" required onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <input style={{ width: "100%", marginBottom: "10px" }} type="email" className="form-control" id="mail"                                           placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group col-md-6" style={{ position: "relative" }}>

                                        <Dropdown style={{ width: "80px", position: "absolute" }}>
                                            <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width:                                                  "60px", marginTop: "4.5px", border: "none" }}>
                                                <img src={selectedCountry.image} alt="" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }} >
                                                {Countries.map((item) => (
                                                    <Dropdown.Item onClick={() => handleCountrySelect(item)}>
                                                        <div id="image-code">
                                                            <img src={item.image} alt={item.name} style={{ width: "30px", height: "30px" }} />
                                                            <p className="ml-3 mt-1">{item.name} {item.phone && item.phone.length > 0 ?                                                                      item.phone[0] : "N/A"}</p>
                                                        </div>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control                                                     contcolor" placeholder="Phone No.*" required
                                            style={{ left: "90px", paddingLeft: "90px", paddingTop: "5px", width: "100%" }} />
                                    </div>

                                    <select class="form-group col-md-6 ml-3 pr-3" style={{ width: '48%' }} id="sel1" aria-label="Default                                                 select example" onChange={(e) => setDropVal(e.target.value)}>
                                        <option selected>Sale</option>
                                        <option value="Rent">Rent</option>
                                    </select>

                                    <select class="form-group col-md-6 ml-3" style={{ width: '48%' }} id="sel1" aria-label="Default select                                           example" onChange={(e) => setProtype(e.target.value)}>
                                        <option selected>Property type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Land">Land</option>
                                        <option value="Warehouse">Warehouse</option>
                                        <option value="House">House</option>
                                        <option value="Commercial">Commercial</option>
                                    </select>


                                    <div className="form-group col-md-6 ml-2" style={{ marginBottom: "10px" }}>
                                        <input style={{ width: "100%" }} type="text" className="form-control col-6 " id="address"                                                     placeholder="Location*" name="address" required onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                    <div className="form-group col-12" style={{ marginBottom: "10px" }}>
                                        <button type="submit" className="btn btn-secondary ml-1" id="sellbtn" onClick={SaleForm}>                                                         {item.sec2button}</button>
                                    </div>
                                </form>

                            </div>
                        </div>


                        <div className='row' style={{ width: "87%", margin: "auto", paddingRight: "0px", marginBottom: "60px", marginTop:                                 "130px" }}>
                            <div className='col-12 col-sm-12 col-md-12	col-lg-6 col-xl-4' style={{ display: "flex" }}>
                                <div className='text-left' id='sale-div-det'>
                                    <h2 className='all-main-heading'>{item.sec3heading}</h2>
                                    <p className='all-para'>{item.sec3discription}</p>
                                </div>
                            </div>

                            <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-8'>
                                <img src={`uploads/${item.sec3image}`} alt="" id='sale-div-image' />
                            </div>

                        </div>

                    </>
                )
            })}





            {/* ***************from********************* */}




        </div>
    )
}

export default Sale
