import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/freshdev.css';
import Countries from './CountryInfo';
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import SearchContext from "../Context/Context1";
import { Link } from 'react-router-dom';
import '../styles/main/popup.css'
import { ToastContainer } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createNotification } from "./Notification/Notification";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';



function FreshDev({pageUrl}) {   
	const link=pageUrl;
	
  const [selectedCountry, setSelectedCountry] = useState(Countries[1]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");



  const handleCountrySelect = (item) => {
    setSelectedCountry(item);
  };
  
// new code imp 
const getContext = useContext(SearchContext);
    const [first,setFirst]=useState('');
    const [Second,setSecond]=useState('');
    const [Third,setThird]=useState('');
    const [Fourth,setFourth]=useState('');
    const [Fifth,setFifth]=useState('');
    const [Sixth,setSixth]=useState('');
    // console.log(getContext.pageid,"pageid");
    const createMarkup = (html) => ({ __html: html });
   
    const [data,setData]=useState([]);
    const [gallaryimages,setGallaryimages]=useState([]);
    const [threeproperty,setThreeproperty]=useState([]);
	 const [nameofProperty, setNamePropertyname]=useState('');
  const dialCode = selectedCountry.phone[0];
    useEffect(()=>{
        const id=localStorage.getItem("internalpageid");
        const name=getContext.pagename;
    axios.get(`/getpropertybyid/${link}`).then((res)=>{
		console.log("data of internal",res.data)
        setData(res.data)
    });
    axios.get(`/getnewly`)
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


    axios.get(`/getPropertyImages/${link}`).then((res)=>{

      const f1=res.data[0]?.imgurl 
	  console.log(res.data[0], "first img");
      const f2=res.data[1]?.imgurl
      const f3=res.data[2]?.imgurl
      const f4=res.data[3]?.imgurl
      const f5=res.data[4]?.imgurl
      const f6=res.data[5]?.imgurl
    setFirst(f1.substring(f1.indexOf('/uploads/')));
       setSecond( f2.substring(f2.indexOf('/uploads/')));
       setThird( f3.substring(f3.indexOf('/uploads/')));
       setFourth( f4.substring(f4.indexOf('/uploads/')));
       setFifth( f5.substring(f5.indexOf('/uploads/')));
       setSixth( f6.substring(f6.indexOf('/uploads/')));
        setGallaryimages(res.data)
    });
    },[]);
	
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

  const [show, setShow] = useState(false);
    const [Namebrochure, setNamebrochure] = useState('');
    const [emailbrochure, setemailbrochure] = useState('');
  const [phoneNumberbrochure, setPhoneNumberbrochure] = useState("");
      const [selectedCountrybrochure, setSelectedCountrybrochure] = useState(Countries[1]);
const [dialCodebrochure,setdialCodebrochure]=useState('+971');
	const [pdftodwnld,setPDF]=useState('');
    //    const dialCodebrochure = selectedCountry.phone[0];
       const handleCountrySelect1 = (item) => {
        console.log(item.phone[0],"hone");
        setdialCodebrochure(item.phone[0])
      setSelectedCountrybrochure(item);
    };
const handleClose=()=>{
    setShow(false);
    setdialCodebrochure("+971")
    setSelectedCountrybrochure(Countries[1]);
}

    const OpenBrochure = (item) => {
		setPDF(item)
        setShow(true);
    }
	
	   function DownloadBrochure(e) {
        e.preventDefault();
        if (Namebrochure && emailbrochure && phoneNumberbrochure && dialCodebrochure) {
          let data = {
            "Name": Namebrochure,
            "email": emailbrochure,
            "Phone": phoneNumberbrochure,
            "dialcode": dialCodebrochure,
            "propertyname": nameofProperty
          };
      
          axios.post('http://localhost:4000/collectbrochuredata', data)
            .then(response => {
              
              if (response.status === 200) {
                setShow(false);
                setSelectedCountrybrochure(Countries[1]);
                setdialCodebrochure("+971")
               const pdftodwnld1="http://localhost:4000/uploads/1709203038245.pdf"
            
        const pdfLink = pdftodwnld1; // Assuming the key for the PDF link is pdfLink, you should replace it with the actual key

        // Open the PDF link in a new window
        window.open(pdfLink, '_blank');
              }
            })
            .catch(error => {
              console.error('Error:', error);
         
            });
        } else {
            
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill out all the fields!',
                icon: 'warning',
                confirmButtonText: 'Ok'
              });
        
        }
      }
	
     
	  
	  
	  
      const OpenFloorPlan=(item)=>{
         const relativePath = item.substring(item.indexOf('/uploads/'));
        const pdfLink =`https://rhdubai.ae/${relativePath}`; // Assuming the key for the PDF link is pdfLink, you should replace it with the actual key

        // Open the PDF link in a new window
        window.open(pdfLink, '_blank');
      }

      const [currentimg,setCurrentimg] = useState();
      const [lastIndex,setLastIndex] = useState();
      
      const newFun = (ind)=>{
          let b = document.getElementById(ind);
          setCurrentimg(ind);
          console.log(ind, " = Image value"); 
          setLastIndex(gallaryimages.length-1)
          console.log(ind, " = current, last = ", lastIndex); 
          let c = document.getElementById("upBox")
          c.classList.add("hkfhkah")
          c.classList.remove("notVisible")
          const p = document.getElementById("jhyu354hu")
          let imgSource = b.getAttribute('src')
          let q = document.getElementById("gfy6569yueyu")
          if(q === null){
              let image = document.createElement("img");
              image.src = imgSource;
              image.alt = "Error loading image";
              image.id = "gfy6569yueyu";
              image.className = "main-image1"
      p.appendChild(image);
          }else{
              q.setAttribute('src',`${imgSource}`)
          }
          
      }
      let Remove = ()=>{
          let c = document.getElementById("upBox")
          c.classList.toggle("hkfhkah")
          c.classList.add("notVisible")
          setCurrentimg(0);
      }
      useEffect(() => {
          console.log(currentimg, " = current, last = ", lastIndex);
      }, [currentimg, lastIndex]);
  
      let previous = ()=>{
          console.log(currentimg);
              if(currentimg === 0){
                  let d = document.getElementById(currentimg)
                  setCurrentimg(prevState =>lastIndex)
                  let imgSource = d.getAttribute('src')
                  let u = document.getElementById("gfy6569yueyu")
                  u.setAttribute('src',`${imgSource}`)
              }else{
                  setCurrentimg(prevState =>currentimg-1)
                  console.log(currentimg);
                  let d = document.getElementById(currentimg)
                              let imgSource = d.getAttribute('src')
                              let u = document.getElementById("gfy6569yueyu")
                  u.setAttribute('src',`${imgSource}`)
              }
            
      }
  
      let next = ()=>{
          if(currentimg === lastIndex){
              let d = document.getElementById(currentimg)
              setCurrentimg(0)
                  let imgSource = d.getAttribute('src')
                  let u = document.getElementById("gfy6569yueyu")
                  u.setAttribute('src',`${imgSource}`)
                  
  
          }else{
            console.log(currentimg,"crunt");
              setCurrentimg(prevState =>currentimg + 1)
              let d = document.getElementById(currentimg)
              console.log(d);
              let imgSource = d.getAttribute('src')
              let u = document.getElementById("gfy6569yueyu")
                  u.setAttribute('src',`${imgSource}`)
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
//new page code 
  const GoForProperty = (item) => {

    console.log(item,"item");
    const id=item.id;
    const name=item.name;
	  
	  
    axios.get(`/getpropertybyid/${id}`).then((res) => {
      setData(res.data)
		 window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    axios.get(`/getallpropertyImages/${name}`).then((res) => {
      console.log(res.data, "imgurl");
      const f1 = res.data[0]?.imgurl
      const f2 = res.data[1]?.imgurl
      const f3 = res.data[2]?.imgurl
      const f4 = res.data[3]?.imgurl
      const f5 = res.data[4]?.imgurl
      const f6 = res.data[5]?.imgurl
      setFirst(f1.substring(f1.indexOf('/uploads/')));
      setSecond(f2.substring(f2.indexOf('/uploads/')));
      setThird(f3.substring(f3.indexOf('/uploads/')));
      setFourth(f4.substring(f4.indexOf('/uploads/')));
      setFifth(f5.substring(f5.indexOf('/uploads/')));
      setSixth(f6.substring(f6.indexOf('/uploads/')));

      setGallaryimages(res.data)
		 window.scrollTo({ top: 0, behavior: 'smooth' });
document.documentElement.scrollTop = 0; 
    });

  }
  return (
	  
	  <>
	  
	  {show && 
      <Modal show={show} onHide={handleClose} id="modelmain" style={{borderRadius : "0px",padding:"10px",}}>
      <Modal.Header closeButton>
        <Modal.Title id="popheading">
        Please provide your details to download the brochure.
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
       

<div className="container">
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div style={{width:"100%"}} className="col-12 col-sm-12 col-md-6	col-lg-7 col-xl-7">

                      <form action="#" style={{ color: '#212529', }}>

                        <div className="form-group">
                          <input onChange={(e) => setNamebrochure(e.target.value)} type="text" style={{ borderRadius: "0px !important" }} className="form-control" id="name" placeholder="Full Name*" required/>
                        </div>

                        <div className="form-group">
                          <input onChange={(e) => setemailbrochure(e.target.value)} type="email" style={{ borderRadius: "0px !important" }} className="form-control contcolor" id="mail" placeholder="Email*" required/>
                        </div>

                        <div className="form-group" style={{ position: "relative", height: "50px" }}>

                          <Dropdown style={{ position: "absolute", paddingRight: "7px", borderRight: "1px solid #ddd", height: "50px" }}>

                          <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", minWidth: "150px", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
<div style={{ display: "flex", alignItems: "center" }}>
  <img src={selectedCountrybrochure.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
  <p className="ml-2" style={{ margin: "0" }}>{dialCodebrochure}</p>
</div>
<span className="caret"></span>
</Dropdown.Toggle>





                            <Dropdown.Menu style={{ height: "200px", overflow: "auto" }}>

                              {Countries.map((item) => {
                                return (

                                  <Dropdown.Item onClick={() => handleCountrySelect1(item)}>
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

                          <input onChange={(e) => setPhoneNumberbrochure(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "160px", paddingTop: "5px" }} />
                        </div>

                   
                        
                       

                    
                    
                      </form>
                    </div>

                  </div>
                </div>

     


       
        <Button variant="success" className="mr-3" style={{ background: '#f99d1c', border: 'none', color: '#4d4d4f' ,borderRadius:"0px",marginBottom:"20px"}} onClick={DownloadBrochure} id="">
          Download Brochure
        </Button>
      </Modal.Footer>
    </Modal>
    
    }
	   <div className="" onClick={()=>OpenBrochure(
)}>
        <img src="./images/offplan-pdf.png" alt="" style={{width:"65px", height:"65px"}}/>
    </div>
    <div>
     
      {data.map((item,index)=>{
        const relativePath = item.bannerimage.substring(item.bannerimage.indexOf('/uploads/'));
        return(
          <>
          <div>
        <img className='banner-new-dev' src={relativePath} alt="Banner Image" />
      </div>

       {/* This is icon bar */}


        <div className="my-2" style={{background:"#f3f3f3"}}>
        <div style={{width:"87%", margin:"auto"}}>
        <div className="row working-hard myuw5t"  >
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 text-center free-fire d-flexflex-column justify-content-center">
                <h3 className="mar5fsy">Developer <br/><span style={{fontWeight:"bold"}}>{item.developername}</span></h3>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 spa46g text-center d-flex flex-column align-items-center">
    <div className="" onClick={()=>OpenBrochure(item.brochure
)}>
        <img src="./images/offplan-pdf.png" alt="" style={{width:"65px", height:"65px"}}/>
    </div>
    <div className="naam-ic">
        <p>Brochure</p>
    </div>
</div>

            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 spa46g  text-center d-flex flex-column align-items-center">
                <div className="" onClick={()=>OpenFloorPlan(item.floorplan
)}>
                <img src="./images/offplan-floorplan.png" alt="" style={{width:"65px", height:"65px"}}/>
                </div>
                <div className="naam-ic">
                    <p>Floor Plan</p>
                </div>
            </div>
            <div  className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 spa46g  text-center d-flex flex-column align-items-center">
                <div className="" onClick={scrollToImageGallery}>
                <img src="./images/offplan-images.png" alt="" style={{width:"65px", height:"65px"}}/>
                </div>
                <div className="naam-ic">
                    <p>Image Gallery</p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 spa46g  text-center d-flex flex-column align-items-center">
                <div className="" onClick={scrollToPaymentPlan}>
                <img src="./images/offplan-payment.png" alt="" style={{width:"65px", height:"65px"}}/>
                </div>
                <div className="naam-ic">
                    <p>Payment Plan</p>
                </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 spa46g  text-center d-flex flex-column align-items-center">
                <div className="" onClick={scrollToLocation}>
                <img src="./images/offplan-loaction.png" alt="" style={{width:"65px", height:"65px"}}/>
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

       <div className="row rowdes" style={{paddingLeft:"0px"}}>
        <div className="col-12 col-sm-6 col-lg-6" style={{paddingLeft:"0px"}}>
          <h4 style={{fontSize:"20px", color:"rgb(80, 77, 79)"}}>Starting Price AED {item.price}</h4>
          <h2 className="mt-3 pname" style={{color:"rgb(33, 37, 41)"}}>{item.propertyname}, {item.propertylocation}</h2>
          <p className="text-justify" style={{color:"rgb(33, 37, 41)"}} dangerouslySetInnerHTML={createMarkup(item.description)}></p>
        </div>
        <div className="col-12 col-sm-6 col-lg-6">
          <div className="container property-form" style={{padding:"0px",margin:"0px"}}>
                  <div className="container">

                    <div className="form-title" style={{marginTop:"40px"}}>
                      <h2 id="" className="center" style={{fontSize:"25px",fontWeight:"bold"}}>Contact Us</h2>
                     
                    </div>

                  </div>

                  <div className="container">
                    <div className="row" >
                      <div className="col-12">

                        <form action="#" style={{ color: '#212529', paddingRight: "10px", paddingLeft: "10px" }}>

                          <div className="form-group">
                            <input onChange={(e) => setName(e.target.value)} type="text" style={{borderRadius:"0px !important"}} className="form-control" id="name" placeholder="Full Name*" required />
                          </div>

                          <div className="form-group">
                            <input onChange={(e) => setemail(e.target.value)} type="email" style={{borderRadius:"0px !important"}} className="form-control contcolor" id="mail" placeholder="Email*" required />
                          </div>

                          <div className="form-group" style={{ position: "relative" }}>

                           <Dropdown style={{ position: "absolute", borderRight: "1px solid #ddd", height: "50px" }}>

                              <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", alignItems: "center" ,justifyContent: "space-between"}}>
    <img src={selectedCountry.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
    <p style={{ marginLeft: "50px" }}>{dialCode}</p>
  </div>
  <span className="caret"></span>
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
                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "160px", paddingTop: "5px", height:"50px" }} />
                          </div>

                         <div  style={{marginTop:"30px"}}>

                                                    <button type="submit" style={{ marginBottom:"40px",marginTop:"30px !important"}} onClick={HandleFormSubmit} className="btn btn-secondary mt-1">Submit</button>
</div>
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
        <h3 style={{color:"rgb(80, 77, 79)"}}>Amenities</h3>
        <div className='ml-3'  dangerouslySetInnerHTML={createMarkup(item.facilities)} />

      </div> 

      {/* Amenities section */}


      {/* payment plan */}
      <div id="paymentnav" className='text-start rowdes'>
        <h3 style={{color:"rgb(80, 77, 79)"}}>Payment Plan</h3>
        <div className='ml-3'  dangerouslySetInnerHTML={createMarkup(item.paymentplan)} />

      </div>

      {/* payment plan */}

      {/* image Gallery */}

      <div id="imageGallery" className='row my-4 rowdes'>

      {gallaryimages.map((image, index) => (
        index == 4 ? 

        <>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg1" style={{marginBottom:"5px"}}>
        
        <img src={first} alt="one" id="0" onClick={()=> newFun(0)} />
       
      
        
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg2"  style={{marginBottom:"5px"}}>
        <img src={Second} alt="two" id="1" onClick={()=> newFun(1)}  />

        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg3"  style={{marginBottom:"5px"}}>
        <img src={Third} alt="three" id="2" onClick={()=> newFun(2)} />

        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg4"  style={{marginBottom:"5px"}}>

        <img src={Fourth} alt="four" id="3" style={{height:"250px",width:"100%"}} onClick={()=> newFun(3)}  />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg5"  style={{marginBottom:"5px", objectFit:"contain"}}>


        <img src={Fifth} style={{height:"250px",width:"100%"}} alt="five" id="4" onClick={()=> newFun(4)}  />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 gallaryimg6" style={{marginBottom:"5px", objectFit:"contain"}}>

        <img src={Sixth} style={{height:"250px",width:"100%"}} alt="sixth" id="5" onClick={()=> newFun(5)}  />
        </div>
       </>
           
        : index >= 5?
        <img key={index} src={image.imgurl.substring(image.imgurl.indexOf('/uploads/'))} alt={index} id={index} onClick={() => newFun(index)} className='noyt'/>
        : null
    ))}

        

      </div>

       <div id="upBox" className='notVisible'>
    <div className='allBtnsss'>

        <img src="/images/Cross.png" alt="Cross logo"  id="cross" onClick={Remove} className="crossx" />
        
    </div>
        <div className='keyuqui'>
        <div className='tpiuw'>
        <img src="/images/Left.png" alt="Left logo" onClick={previous} className='tmjiuw'/>
        </div>
        <div id="jhyu354hu">

        </div>
        <div className='tdy98afy'>
        <img  src="/images/Right.png" alt="Right logo" onClick={next} className='tkafy' />
        </div>
        </div>

    </div> 

      {/* image Gallery */}

      {/* youtube Link */}
       <div className="row my-3 rowdes" >
        <div className="col-12 col-sm-12 col-lg-12"  style={{padding:"0px"}}>
        <iframe className='youtube-prop' src={item.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div> 

      {/* youtube Link */}

      {/*Location plus features */}
       <div  id="locationnav" className="row my-3 rowdes">
        <h3 style={{color:"rgb(80, 77, 79)"}}>Location</h3>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
        <iframe className='location-prop' src={item.location} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 loc-feat p-5">
       
         
      
        <div         dangerouslySetInnerHTML={createMarkup(item.keyfeature

)}/>

      

        </div>

      </div>
      {/*Location plus features */}
          </>

        )
      })}
      

      {/*view more Properties */}

       <div className="row my-3 rowdes">
        <h3 style={{color:"rgb(80, 77, 79)"}}>View More Properties</h3>
      
        {threeproperty.slice(0,3).map((item,index)=>{
		const relativePath = item.bannerimage.substring(item.bannerimage.indexOf('/uploads/'));
          return(
			   
<div className="col-12 col-sm-6 col-lg-4 col-xl-4 my-2" >
		 <Link to ={`/${item.pagelink}`} className="link-color-change">
		 
		 <div className="mar-sm-30" style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
                <div><img src={relativePath} alt="New Image"  width="100%"/></div>
                <div className='m-2' style={{padding:"10px"}}>
                    <div className='dveti d-flex justify-content-between ' style={{color:"#4e5150"  }}><span>{item.propertyname}</span><span style={{marginLeft:"20px"}}>{item.developername}</span></div>
                    <p className="huye" style={{fontWeight:"500",color:"#212529"}}>{item.propertylocation}</p>
                    <p className="dwet" style={{color:"#4e5150",lineHeight: "22px",marginTop: "10px",  }}>Starting From {item.price}</p>
                    <p className="joy" style={{fontWeight:"500",color:"#212529"  }}>Project Completed in {item.complete}</p>
                    
                </div>
                <button className  ='p-1 hovon' style={{width:"100%",border:"none",color:"white", fontSize:"18px",fontWeight:"500", height:"40px"}}>Know More</button>
            </div>
		 
		 
		 
        
		  </Link>
        </div>


          )

        })}
        
       

      </div>


      {/*view more Properties */}
    </div>
    </>
  )
}

export default FreshDev;
