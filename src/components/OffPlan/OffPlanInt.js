import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/offplan/OffPlanInt.css'

import { Dropdown } from "react-bootstrap";
import axios from "axios";
import SearchContext from "../../Context/Context1";
import Countries from "../CountryInfo";


function FreshDev() {
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [nameofProperty, setNamePropertyname]=useState('');
  const dialCode = selectedCountry.phone[0];

  
  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };

  // new code imp 
  const getContext = useContext(SearchContext);
  const [first, setFirst] = useState('');
  const [Second, setSecond] = useState('');
  const [Third, setThird] = useState('');
  const [Fourth, setFourth] = useState('');
  const [Fifth, setFifth] = useState('');
  const [Sixth, setSixth] = useState('');
  // console.log(getContext.pageid,"pageid");
  const createMarkup = (html) => ({ __html: html });

  const [data, setData] = useState([]);
  const [gallaryimages, setGallaryimages] = useState([]);
  const [threeproperty, setThreeproperty] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("internalpageid");
    const name = getContext.pagename;
    axios.get(`http://localhost:4000/getpropertybyid/${id}`).then((res) => {
      setNamePropertyname(res.data[0]?.propertyname);
      setData(res.data)
    });
    axios.get(`http://localhost:4000/getnewly`)
      .then((res) => {
        // Filter out the data based on the specific ID
        const filteredData = res.data.filter(item => item.pagelink !== name);

        // Set the filtered data in the state
        // console.log(filteredData,"filtereddata");
        setThreeproperty(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });


    axios.get(`http://localhost:4000/getimages/${name}`).then((res) => {
      console.log(res.data, "imgurl");
      setFirst(res.data[0]?.imgurl);
      setSecond(res.data[1]?.imgurl);
      setThird(res.data[2]?.imgurl);
      setFourth(res.data[3]?.imgurl);
      setFifth(res.data[4]?.imgurl);
      setSixth(res.data[5]?.imgurl);
      setGallaryimages(res.data)
    });
  }, []);
  const scrollToImageGallery = () => {
    const imageGallerySection = document.getElementById('imageGallery');
    if (imageGallerySection) {
      imageGallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToPaymentPlan = () => {
    const imageGallerySection = document.getElementById('paymentnav');
    if (imageGallerySection) {
      imageGallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToLocation = () => {
    const imageGallerySection = document.getElementById('locationnav');
    if (imageGallerySection) {
      imageGallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const OpenBrochure = (item) => {
    console.log(item);
    const pdfLink = `http://localhost:4000/uploads/${item}`; // Assuming the key for the PDF link is pdfLink, you should replace it with the actual key

    // Open the PDF link in a new window
    window.open(pdfLink, '_blank');
  }
  const OpenFloorPlan = (item) => {
    console.log(item);
    const pdfLink = `http://localhost:4000/uploads/${item}`; // Assuming the key for the PDF link is pdfLink, you should replace it with the actual key

    // Open the PDF link in a new window
    window.open(pdfLink, '_blank');
  }

  const [currentimg, setCurrentimg] = useState();
  const [lastIndex, setLastIndex] = useState();

  const newFun = (ind) => {
    let b = document.getElementById(ind);
    setCurrentimg(ind);
    console.log(ind, " = Image value");
    setLastIndex(gallaryimages.length - 1)
    console.log(ind, " = current, last = ", lastIndex);
    let c = document.getElementById("upBox")
    c.classList.add("hkfhkah")
    c.classList.remove("notVisible")
    const p = document.getElementById("jhyu354hu")
    let imgSource = b.getAttribute('src')
    let q = document.getElementById("gfy6569yueyu")
    if (q === null) {
      let image = document.createElement("img");
      image.src = imgSource;
      image.alt = "Error loading image";
      image.id = "gfy6569yueyu";
      image.className = "main-image1"
      p.appendChild(image);
    } else {
      q.setAttribute('src', `${imgSource}`)
    }

  }
  let Remove = () => {
    let c = document.getElementById("upBox")
    c.classList.toggle("hkfhkah")
    c.classList.add("notVisible")
    setCurrentimg(0);
  }
  useEffect(() => {
    console.log(currentimg, " = current, last = ", lastIndex);
  }, [currentimg, lastIndex]);

  let previous = () => {
    console.log(currentimg);
    if (currentimg === 0) {
      let d = document.getElementById(currentimg)
      setCurrentimg(prevState => lastIndex)
      let imgSource = d.getAttribute('src')
      let u = document.getElementById("gfy6569yueyu")
      u.setAttribute('src', `${imgSource}`)
    } else {
      setCurrentimg(prevState => currentimg - 1)
      console.log(currentimg);
      let d = document.getElementById(currentimg)
      let imgSource = d.getAttribute('src')
      let u = document.getElementById("gfy6569yueyu")
      u.setAttribute('src', `${imgSource}`)
    }

  }

  let next = () => {
    if (currentimg === lastIndex) {
      let d = document.getElementById(currentimg)
      setCurrentimg(0)
      let imgSource = d.getAttribute('src')
      let u = document.getElementById("gfy6569yueyu")
      u.setAttribute('src', `${imgSource}`)


    } else {
      console.log(currentimg, "crunt");
      setCurrentimg(prevState => currentimg + 1)
      let d = document.getElementById(currentimg)
      console.log(d);
      let imgSource = d.getAttribute('src')
      let u = document.getElementById("gfy6569yueyu")
      u.setAttribute('src', `${imgSource}`)
    }
  }

  // newcode 

  const HandleFormSubmit=()=>{
    const data={
      "name":name,
      "email":email,
      "phone":phoneNumber,
      "dialcode":dialCode,
      "propertyname":nameofProperty
    };
    axios.post("http://localhost:4000/newdevform",data).then((res)=>{
      if(res.status===200){
        alert("For is submitted!")
      }
    })
  }

  return (
    <div>
      {data.map((item, index) => {
        return (

          <>
            <div>
              <img className='banner-new-dev' src={`/uploads/${item.bannerimage}`} alt="Banner Image" />
            </div>

            {/* This is icon bar */}


            <div className="my-2" style={{ background: "#f3f3f3" }}>
              <div style={{ width: "87%", margin: "auto" }}>
                <div className="row working-hard" >
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center mt-2 free-fire">
                    <h3>Developer <br /><span style={{ fontWeight: "bold" }}>{item.developername}</span></h3>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div className="image-page" onClick={() => OpenBrochure(item.brochure
                    )}>
                      <img src="./images/offplan-pdf.png" alt="" style={{ width: "65px", height: "65px" }} />
                    </div>
                    <div className="naam-ic">
                      <p>Brochure</p>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div className="image-page" onClick={() => OpenFloorPlan(item.floorplan
                    )}>
                      <img src="./images/offplan-floorplan.png" alt="" style={{ width: "65px", height: "65px" }} />
                    </div>
                    <div className="naam-ic">
                      <p>Floor Plan</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div className="image-page" onClick={scrollToImageGallery}>
                      <img src="./images/offplan-images.png" alt="" style={{ width: "65px", height: "65px" }} />
                    </div>
                    <div className="naam-ic">
                      <p>Image Gallery</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div className="image-page" onClick={scrollToPaymentPlan}>
                      <img src="./images/offplan-payment.png" alt="" style={{ width: "65px", height: "65px" }} />
                    </div>
                    <div className="naam-ic">
                      <p>Payment Plan</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div className="image-page" onClick={scrollToLocation}>
                      <img src="./images/offplan-loaction.png" alt="" style={{ width: "65px", height: "65px" }} />
                    </div>
                    <div className="naam-ic">
                      <p>Location</p>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            {/* This is icon bar */}

            {/* this is first section with form */}

            <div className="row rowdes" style={{ paddingLeft: "0px" }}>
              <div className="col-12 col-sm-6 col-lg-6" style={{ paddingLeft: "0px" }}>
                <h4 style={{ fontSize: "20px", color: "rgb(80, 77, 79)" }}>Starting Price AED {item.price}</h4>
                <p style={{ color: "rgb(33, 37, 41)", fontSize: "16px" }}>{item.propertyname}, {item.propertylocation}</p>
                {/* <p className="text-justify" style={{color:"rgb(33, 37, 41)"}}>dangerouslySetInnerHTML={createMarkup(item.description)}</p> */}
                <p className="text-justify" style={{ color: "rgb(33, 37, 41)" }} dangerouslySetInnerHTML={createMarkup(item.description)}></p>

              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <div className="container property-form">
                  <div className="container">

                    <div className="form-title mt-3">
                      <h2 id="" className="center">Contact US</h2>
                      <p id="seel-property-para-thinking">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, animi? </p>
                    </div>

                  </div>

                  <div className="container">
                    <div className="row" >
                      <div className="col-12">

                        <form action="#" style={{ color: '#212529', paddingRight: "10px", paddingLeft: "10px" }}>

                          <div className="form-group" style={{ marginBottom: "20px" }}>
                            <input onChange={(e) => setName(e.target.value)} type="text" style={{ borderRadius: "0px", height: "50px" }} className="form-control" id="name" placeholder="Full Name*" required />
                          </div>

                          <div className="form-group" style={{ marginBottom: "20px" }}>
                            <input style={{ borderRadius: "0px", height: "50px" }} onChange={(e) => setemail(e.target.value)} type="email" className="form-control contcolor" id="mail" placeholder="Email*" required />
                          </div>

                          <div className="form-group" style={{ position: "relative", marginBottom: "20px", border: "1px solid yellow" }}>

                            <Dropdown style={{ width: "80px", position: "absolute", border: "1px solid green" }}>

                              <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "60px", marginTop: "4.5px", border: "none", display: "flex", flexWrap: "nowrap" }}>
                                <img src={selectedCountry.image} alt="" style={{ border: "1px solid red" }} />
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
                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ textIndent: "50px", paddingTop: "5px", borderRadius: "0px", height: "50px" }} />
                          </div>
                          <button type="submit" className="btn btn-secondary mt-1" onClick={HandleFormSubmit}>Submit</button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* this is first section with form */}

            {/* Amenities section */}

            <div className='text-start rowdes'>
              <h3 style={{ color: "rgb(80, 77, 79)" }}>Amenities</h3>
              <div className='ml-3' dangerouslySetInnerHTML={createMarkup(item.facilities)} />

            </div>

            {/* Amenities section */}


            {/* payment plan */}
            <div className='text-start rowdes'>
              <h3 style={{ color: "rgb(80, 77, 79)" }}>Payment Plan</h3>
              <div className='ml-3' dangerouslySetInnerHTML={createMarkup(item.paymentplan)} />

            </div>

            {/* payment plan */}

            {/* image Gallery */}

            <div className='row my-4 rowdes'>

              {gallaryimages.map((image, index) => (
                index == 4 ?

                  <>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px" }}>
                      {/* <div className="newfjhjdhk"> */}
                      <img src={`/uploads/${first}`} alt="one" id="0" onClick={() => newFun(0)} />
                      {/* </div> */}


                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px" }}>
                      <img src={`/uploads/${Second}`} alt="two" id="1" onClick={() => newFun(1)} />

                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px" }}>
                      <img src={`/uploads/${Third}`} alt="three" id="2" onClick={() => newFun(2)} />

                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px" }}>

                      <img src={`/uploads/${Fourth}`} alt="four" id="3" style={{ height: "250px", width: "100%" }} onClick={() => newFun(3)} />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px", objectFit: "contain" }}>


                      <img src={`/uploads/${Fifth}`} style={{ height: "250px", width: "100%" }} alt="five" id="4" onClick={() => newFun(4)} />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-4" style={{ marginBottom: "24px", objectFit: "contain" }}>

                      <img src={`/uploads/${Sixth}`} style={{ height: "250px", width: "100%" }} alt="sixth" id="5" onClick={() => newFun(5)} />
                    </div>
                  </>

                  : index >= 5 ?
                    <img key={index} src={`/uploads/${image.imgurl}`} alt={index} id={index} onClick={() => newFun(index)} className='noyt' />
                    : null
              ))}



            </div>

            <div id="upBox" className='notVisible'>
              <div className='allBtnsss'>

                <img src="/images/Cross.png" alt="Cross logo" id="cross" onClick={Remove} className="crossx" />

              </div>
              <div className='keyuqui'>
                <div className='tpiuw'>
                  <img src="/images/Left.png" alt="Left logo" onClick={previous} className='tmjiuw' />
                </div>
                <div id="jhyu354hu">

                </div>
                <div className='tdy98afy'>
                  <img src="/images/Right.png" alt="Right logo" onClick={next} className='tkafy' />
                </div>
              </div>

            </div>

            {/* image Gallery */}

            {/* youtube Link */}
            <div className="row my-3 rowdes">
              <div className="col-12 col-sm-12 col-lg-12">
                <iframe className='youtube-prop' src={item.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>

            {/* youtube Link */}

            {/*Location plus features */}
            <div className="row my-3 rowdes">
              <h3 style={{ color: "rgb(80, 77, 79)" }}>Location</h3>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                <iframe className='location-prop' src={item.location} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 loc-feat">

                <div
                  dangerouslySetInnerHTML={createMarkup(item.keyfeature)} />


              </div>

            </div>
            {/*Location plus features */}
          </>

        )
      })}


      {/*view more Properties */}

      <div className="row my-3 rowdes">
        <h3 style={{ color: "rgb(80, 77, 79)" }}>View More Properties</h3>

        {threeproperty.slice(0, 3).map((item, index) => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-4 my-2" >
              <div style={{ boxShadow: "0px 0px 10px #EDEADE" }}>
                <div className="image-section-card" style={{ width: "100%" }}>
                  <img src={`/uploads/${item.bannerimage}`} alt="" />
                </div>
                <div style={{ padding: "5px 10px" }}>
                  <h3>{item.propertyname}</h3>
                  <div className="row" style={{ paddingLeft: "0px" }}>
                    <div className="col-6 d-flex" style={{ paddingLeft: "0px" }}>
                      <img src="/images/offplan-loaction.png" alt="" className='counter-icon' /><label htmlFor="" style={{ marginTop: "3px" }}>{item.developername}</label>
                    </div>
                    <div className="col-6 d-flex">
                      <img src="/images/hotel-s.png" alt="" className='hotel-icon' /><label htmlFor="" style={{ marginTop: "3px" }}>{item.propertylocation}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

        })}



      </div>


      {/*view more Properties */}
    </div>
  )
}

export default FreshDev;