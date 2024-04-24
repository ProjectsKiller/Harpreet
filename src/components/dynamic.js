import React, { useEffect, useState, useRef ,useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Countries from '../components/CountryInfo';
import { Dropdown } from "react-bootstrap";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import $ from 'jquery';
import "../styles/banner/banner.css"

import Swal from 'sweetalert2';
import axios from 'axios';

const YourModalComponent = ({ isOpen, gallarydata, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const h3Ref = useRef(null);

  let picsData = [];
    if (gallarydata[0] && gallarydata[0].pics) {
    // Check if Editdata[0].pics is a string
    if (typeof gallarydata[0].pics === 'string') {
        // Convert the string to an array using JSON.parse
        gallarydata[0].pics = JSON.parse(gallarydata[0].pics);
    }

    // Use the map method on the array
    picsData = gallarydata[0].pics.map(image => ({
        id: image.id,
        name: image.name,
        url: `uploads/${image.name}`
    }));
}



    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % picsData.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? picsData.length - 1 : prevIndex - 1
        );
    };

    return (
        <>


            {isOpen && (
                <div className="modal-overlay" >
                    <div className="modal-content" style={{borderRadius:"0px"}}>
                        <button onClick={onClose} className="close-button" style={{ textAlign: "right", background: "transparent", fontSize: "20px" }}>
                            &#10006; {/* Close symbol (X) */}
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: 'auto' }}>
                        </div>
                        <div className="image-gallery" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <button onClick={goToPreviousImage} className="nav-button" style={{fontSize:"25px", background:"transparent"}}>
                            &#x2B9C; {/* Left arrow */}
                            </button>


                            <img
                                style={{ width: '450px', height: '320px' ,borderRadius:"0px", marginBottom:"30px"}}
                                src={picsData[currentImageIndex]?.url}
                                alt={`Image ${currentImageIndex}`}
                            />



                            <button onClick={goToNextImage} className="nav-button" style={{fontSize:"25px", background:"transparent"}}>
                            &#x2B9E; {/* Right arrow */}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};


function AddForm({pageUrl}){

  const [policy1Checked, setPolicy1Checked] = useState(false);
  const [policy2Checked, setPolicy2Checked] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry1, setSelectedCountry1] = useState(Countries[1]);
  const dialCode = selectedCountry1.phone[0];
  const handleCountrySelect1 = (item) => {
    setSelectedCountry1(item);
  };

  // function SubmitForm(e) {
  //   e.preventDefault();
  //   let data = {
  //     name: name,
  //     email: email,
  //     dialCode: dialCode,
  //     phoneNumber: phoneNumber,
  //     pageUrl:pageUrl
  //   };




  //   if (name && email && dialCode && phoneNumber) {
  //     axios.post(`http://localhost:4000/demodb`, data).then((res) => {
  //       if (res.data) {
  //         alert("Data is Added Sucessfully");
  //       } else {
  //         alert("Data is Already Present!");
  //       }
  //     });
  //   }
  //   else {
  //     alert("Please Enter Valid Details!");
  //   }
  // }

  function SubmitForm(e) {
    e.preventDefault();

    if (name && email && dialCode && phoneNumber) {
      if (policy1Checked && policy2Checked) {
        let data = {
          name: name,
          email: email,
          dialCode: dialCode,
          phoneNumber: phoneNumber,
          pageUrl:pageUrl
        };
    
        axios.post(`http://localhost:4000/demodb`, data).then((res) => {
          if (res.data) {
            Swal.fire({
              title: 'Success!',
              text: 'Data is Added Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          } else {
            Swal.fire({
              title: 'Warning!',
              text: 'Data is Already Present!',
              icon: 'warning',
              confirmButtonText: 'Ok'
            });
          }
        });
      } else {
        if (!policy1Checked) {
          Swal.fire({
            title: 'Warning!',
            text: 'Please accept the Terms & Conditions and Privacy Policy!',
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
        }
        if (!policy2Checked) {
          Swal.fire({
            title: 'Warning!',
            text: 'Please agree to receive information about property offers, deals & services from Raine & Horne!',
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
        }
      }
    }
    else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please Enter Valid Details!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  return (

    <div className="container property-form" id="mortagageform">
    <div style={{ margin:"40px 10px"}}>
  
                                  <h2 className="text-center" id='list-property'>Contact Us</h2>
  
  
                                  <div className="container">
                                      <div className="row" >
                                          <div className="col-md-12 col-sm-12 col-xs-12" >
  
                                              <form action="#" style={{ margin: "auto"}}>
  
                                                  <div className="form-group col-12 sameformformort">
                                                      <input style={{ width: "100% !important" }} type="text" id="name" placeholder="Full name*" name="name" required onChange={(e) => setName(e.target.value)} />
                                                  </div>
  
  
                                                  <div className="form-group col-12 sameformformort">
                                                      <input style={{ width: "100%" }} type="email" className="form-                                                             control" id="mail" placeholder="Email*" onChange={(e) => setemail(e.target.value)} />
                                                  </div>
  
                                                  <div className="form-group" style={{ position: "relative" }}>
  
                                                      <Dropdown style={{ width: "80px", position: "absolute", borderRight: "1px solid #ddd" }}>
  
                                                     
                              <Dropdown.Toggle className="codedrop" variant="transparent" id="dropdown-basic" style={{ width: "auto", minWidth: "150px", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={selectedCountry1.image} alt="" style={{ height: "30px", marginRight: "10px" }} />
      <p className="ml-2" style={{ margin: "0" }}>{dialCode}</p>
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
  
                                                      <input type="phone" className="form-control contcolor" placeholder="Phone No.*" required style={{ left: "160px", paddingLeft: "90px", paddingTop: "5px" }} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                  </div>
                                                  {/* <div style={{ marginTop: "10px" }}>
          <input type="checkbox" id="policy1" name="policy1" />
          <label htmlFor="policy1">I accept the Terms & Conditions and Privacy Policy.</label>
      </div> */}
  <div style={{ marginTop: "10px", display: "flex", alignItems: "flex-start" }}>
      <input type="checkbox" name="policy1" style={{ marginTop: "3px", width: "15px", height: "15px", borderRadius: "0", border: "1px solid black" }}  onChange={() => setPolicy1Checked(!policy1Checked)} />
      <label htmlFor="policy1" style={{ marginLeft: "5px", marginBottom: "0" }}>I accept the Terms & Conditions and Privacy Policy.</label>
  </div>
  <div style={{ marginTop: "10px", display: "flex", alignItems: "flex-start" }}>
      <input type="checkbox"  name="policy2" style={{ marginTop: "3px", width: "15px", height: "15px", borderRadius: "0", border: "1px solid black" }}  onChange={() => setPolicy2Checked(!policy2Checked)}/>
      <label htmlFor="policy2" style={{ marginLeft: "5px", marginBottom: "0", textAlign: "left" }}>I agree to receive information about property offers, deals & services from Raine & Horne</label>
  </div>
  
  
  
                               
                                                      <button type="submit" className="btn btn-secondary" style={{marginTop:"30px",marginLeft:"0px !important",border:"1px solid #ddd"}} onClick={SubmitForm}>Submit</button>
                                                  
                                              </form>
                                          </div>
                                      </div>
                                  </div>
    </div>
                              </div>
  );


}


const DynamicPage = () => {
    const { pageUrl } = useParams();
    const [htmlContent, setHtmlContent] = useState('');
    const [cssContent, setCssContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null); // Ref to the content container
    const [pagetype, setpagetype] = useState('');
   // Initialize selectedCountry with the first country's code
    const [selectedCountry, setSelectedCountry] = useState('+971');

const [subemail, setSubemail] = useState("");
   const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
      };

    const createMarkup = (html) => ({ __html: html });

  
    const [seoData, setSeoData] = useState({
        title: '',
        description: '',
        keywords: ''
    });
    const [blogData, setBlogData] = useState(null);
	const [isModelOpen, setIsModelOpen] = useState(false);
	 const [gallarydata, setGallaryData] = useState([]);
    const [newhtml,setNewhtml]=useState('');
    const [newcss,setNewcss]=useState('');
	
  const [blogcards, setblogcards] = useState([]);

  function Blog(){
    axios.get(`http://localhost:4000/blogdatafecth`).then((res) => {
        setblogcards(res.data)
  
      })
  }
  const [sliceval, setSliceVal] = useState('');
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      let newSliceVal = 4; // Default slice end index
      if (screenWidth >= 768 && screenWidth <= 992) {
        console.log(screenWidth, "width");
        newSliceVal = 3;
      }
      else if (screenWidth >= 576 && screenWidth <= 768) {
        newSliceVal = 2;
      }
      setSliceVal(newSliceVal);
    }


    handleResize();


    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [/* no dependencies */]);
    const handleCloseModal = () => {
        setIsModelOpen(false);
    };
      const [homedata,setHomedata]=useState([])
      useEffect(() => {
          const homedata = { "tablename": "homepagedb" }
          axios.post(`http://localhost:4000/staticdata`, homedata).then((res) => {
              setHomedata(res.data)
          });
          Blog();
        }, []);
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

  
    useEffect(() => {
        // Fetch HTML content
        fetch(`/uploads/page_${pageUrl}.html`)
          .then(response => response.text())
          .then(data => setNewhtml(data))
          .catch(error => console.error('Error fetching HTML:', error));
    
        // Fetch CSS content
        fetch(`/uploads/page_${pageUrl}.css`)
          .then(response => response.text())
          .then(data => setNewcss(data))
          .catch(error => console.error('Error fetching CSS:', error));
      }, [pageUrl]);


 const [runEffect, setRunEffect] = useState(false);

  const handlePaymentClick = () => {
    setRunEffect(true);

    const paymentRowElement = document.getElementById('paymentrow');
    if (paymentRowElement) {
      paymentRowElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

    useEffect(() => {
    if (htmlContent) {

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
  
  
      const paymentElement = document.getElementById('payment');

      if (paymentElement) {
        paymentElement.style.cursor = 'pointer';
        paymentElement.addEventListener('click', handlePaymentClick);

        // Cleanup the event listener when the component unmounts
        return () => {
          paymentElement.removeEventListener('click', handlePaymentClick);
        };
      }
    }
  }, [runEffect]);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch(`http://localhost:4000/api/pagedata/${pageUrl}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if(data.type=="pages") {
                    setHtmlContent(data.fileurl);
                    setCssContent(data.cssurl);
                    setSeoData({
                        title: data.seoTitle,
                        description: data.metaDescription,
                        keywords: data.keywords
                    });
                    setpagetype("pages");


                } 
				else if(data.type=="newproperty"){
	
				   setpagetype("newproperty");
				}
				
				
                else if(data.type=="blogs") {
                    setBlogData(data);
                    setSeoData({
                        title: data.seo_title,
                        description: data.description,
                        keywords: data.meta_keywords	
                      });
                      setpagetype("blogs");

                }
                else {
                    throw new Error('Invalid data structure from API');
                }
            })
            .catch(error => {
                console.error('Error fetching page:', error);
                setError(error);
            })
            .finally(() => setIsLoading(false));
    }, [pageUrl]);

    useEffect(() => {
        if (htmlContent && !isLoading) {
            setTimeout(initializeSlider, 500); 
        }
    }, [htmlContent, isLoading]);


    const initializeSlider = () => {
        if (contentRef.current) {
            $(contentRef.current).find('.testimonials-slider').slick({
                // Slider settings
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            });
        }
    };

    const [dropdownCreated, setDropdownCreated] = useState(false);

      const [flagsLoaded, setFlagsLoaded] = useState(false);

useEffect(() => {
    let timeoutId;

    if (!dropdownCreated && !isLoading && contentRef.current && newhtml && Countries && Countries.length > 0 && !flagsLoaded) {
        timeoutId = setTimeout(() => {
            const emptyDiv = contentRef.current.querySelector('.empty-div');

            console.log("emptyDiv", emptyDiv);
            if (emptyDiv) {
                // Hide the original select
                emptyDiv.style.display = 'none';
                // Create a custom dropdown container
                const dropdownContainer = document.createElement('div');
                dropdownContainer.className = 'custom-dropdown';
                dropdownContainer.style.position = 'relative';

           
                const selectedOptionDisplay = document.createElement('div');
                selectedOptionDisplay.className = 'selected-option';
                selectedOptionDisplay.style.cursor = 'pointer';
                selectedOptionDisplay.style.display = 'flex';
                selectedOptionDisplay.style.alignItems = 'center';
                selectedOptionDisplay.style.justifyContent = 'space-between';
                selectedOptionDisplay.innerHTML = `
                    <img src="${Countries[1].image}" alt="${Countries[1].name}" class="country-flag" />
                    <span class="dropdown-arrow">&#9660;</span>  <!-- This is the arrow icon -->
                `;
                dropdownContainer.appendChild(selectedOptionDisplay);


                const dropdownList = document.createElement('div');
                dropdownList.className = 'dropdown-list';
                dropdownList.style.position = 'absolute';
                dropdownList.style.zIndex = '10';
                dropdownList.style.display = 'none'; 
                dropdownContainer.appendChild(dropdownList);


                Countries.forEach((country, index) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'dropdown-option';
                    optionDiv.innerHTML = `
                        <img src="${country.image}" alt="${country.name}" class="country-flag" />
                        ${country.name} (${country.phone})
                    `;
                    optionDiv.onclick = () => {
                        selectedOptionDisplay.innerHTML = '';


                        const imgElement = document.createElement('img');
                        imgElement.src = country.image;
                        imgElement.alt = country.name;
                        imgElement.classList.add('country-flag');
                        selectedOptionDisplay.appendChild(imgElement);


                        const textNode = document.createTextNode(` (${country.phone})`);
                        selectedOptionDisplay.appendChild(textNode);


                        emptyDiv.value = country.phone;

                        setSelectedCountry(country.phone[0])


                        dropdownList.style.display = 'none';
                    };

                    if (index === 1) {
                        optionDiv.classList.add('selected');

                    }

                    dropdownList.appendChild(optionDiv);
                });

                selectedOptionDisplay.onclick = () => {
                    dropdownList.style.display = dropdownList.style.display === 'none' ? 'block' : 'none';
                };


                emptyDiv.parentNode.insertBefore(dropdownContainer, emptyDiv.nextSibling);

                setDropdownCreated(true);
                setFlagsLoaded(true);
            }
        }, 5000);
    }

    // Cleanup
    return () => {
        clearTimeout(timeoutId);
    };
}, [isLoading, contentRef, newhtml, Countries, dropdownCreated, flagsLoaded]);

// useEffect for cleaning up
useEffect(() => {

    const cleanupFunction = () => {
        if (contentRef.current) {
          console.log("in if ")
            const forms = contentRef.current.querySelectorAll('form');
            console.log(forms,"forms");
            forms.forEach(form => {
                form.removeEventListener('submit', submitForm);
            });
        }
    };

    return cleanupFunction;
}, [contentRef]);


const submitForm = (e) => {
  e.preventDefault();
  alert("okay");

  const formData = new FormData(document.querySelector(".custom-form"));

  formData.append('countryCode', selectedCountryRef.current);
  if (pageUrl === 'sale') {
      formData.append('frompage', 'List Your Property');
  } else {
      formData.append('frompage', pageUrl);
  }

  const data = {};
  
  formData.forEach((value, key) => {
      data[key] = value;
  });

  fetch('http://localhost:4000/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(() => {
      Swal.fire({
          title: 'Success!',
          text: 'Form submitted successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
  })
  .catch(error => {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
  });
};

// useEffect(() => {
  const addFormElement = document.querySelector(".add-form");
  console.log(addFormElement,"aja hun");
  if (addFormElement) {
    ReactDOM.render(<AddForm pageUrl={pageUrl}/>, addFormElement);
  } else {
    console.error("Container element with id 'ih5e' not found.");
  }
// }, [newhtml]);


    const selectedCountryRef = useRef(selectedCountry);
    useEffect(() => {
        selectedCountryRef.current = selectedCountry;
    }, [selectedCountry]);


	  function SubscribeEmailGet(e) {
    e.preventDefault();
    if (isChecked === true) {
      let data = { 'subemail': subemail };
      axios.post(`http://localhost:4000/getemailforsub`, data).then((res) => {
        if (res.status === 200) {

          Swal.fire({
            title: 'Success!',
            text: 'Thankyou For Subscribing Us!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        } else {
          // alert("Userinfo is already present!");
          Swal.fire({
            title: 'Success!',
            text: 'You are already subscribed!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
    else {
      alert("warning", "Please Click on Agree for Further Processing");
    }

  }
	
useEffect(() => {
    const handlePicClick = (event) => {
        const target = event.target;
       
        // Check if the clicked element has a class starting with 'pic'
        if (target.classList.contains('pic')) {
         

            // Get pageUrl and make axios call
            let data = { 'pageUrl': pageUrl }; // Assuming the class itself is the pageUrl
			console.log(data,"data for backend");
            axios.post(`/opengallary`, data).then((res) => {
			console.log(res.data,"data from backend")
                setGallaryData(res.data);
            });

            // Open the gallery modal
            setIsModelOpen(true);
        }
    };

    if (newhtml) {
        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(newhtml, 'text/html');

        // Attach click event handler to the document (event delegation)
        document.addEventListener('click', handlePicClick);
    }

    // Cleanup event listener when component unmounts or when new HTML is received
    return () => {
        document.removeEventListener('click', handlePicClick);
    };
}, [newhtml, pageUrl]);




  
useEffect(() => {
  const handleGalleryClick = () => {
      const galleryRowDiv = document.getElementById('gallaryrow');
      if (galleryRowDiv) {
          galleryRowDiv.scrollIntoView({
              behavior: 'smooth'
          });
      }
  };


  if (newhtml) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(newhtml, 'text/html');

      const galleryDiv = document.getElementById('gallary');
      const picsDiv = doc.querySelector('.pics');
 
      if (galleryDiv) {
          galleryDiv.addEventListener("click", handleGalleryClick);
      } else {
          console.log('Div with id "gallary" not found.');
      }


  } else {
      console.log('htmlContent is empty or falsy.');
  }
}, [newhtml, pageUrl, setGallaryData, setIsModelOpen]);




    useEffect(() => {
        const attachClickListener = (divId, rowId) => {
            const div = document.getElementById(divId);
            if (div) {
                div.style.cursor = 'pointer';
                div.addEventListener("click", function () {
                    const rowDiv = document.getElementById(rowId);
                    if (rowDiv) {
                        rowDiv.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        console.log(`Div with id "${rowId}" not found.`);
                    }
                });
            } else {
                console.log(`Div with id "${divId}" not found.`);
            }
        };
    
        if (newhtml) {
            attachClickListener('payment', 'paymentrow');
            attachClickListener('location', 'locationrow');
        }
    }, [newhtml]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading the page: {error.message}</div>;
    }
	function renderWithLineBreaks(text) {

    const replacedText = text.replace(/<br\s*\/?>/g, '\n');
  
    const paragraphs = replacedText.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
    return paragraphs;
  }
	
	
	     function extractTextFromHtml1(html, tag, index, charLimit) {
        const match = html.match(new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, 'g'));
        if (match && match.length > index) {
          const plainText = match[index].replace(new RegExp(`<${tag}.*?>|<\/${tag}>`, 'g'), '');
          return plainText.length > charLimit ? plainText.substring(0, charLimit) + '...' : plainText;
        }
        return '';
      } 

    
	
    
    return (
        <div className='row mar0'>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description || 'Default Description'} />
                <meta name="keywords" content={seoData.keywords || 'Default, Keywords'} />
            </Helmet>
  <YourModalComponent
                isOpen={isModelOpen}
                gallarydata={gallarydata}
                onClose={handleCloseModal}
            />
            {pagetype==="pages"?
            <>
                    <style dangerouslySetInnerHTML={{ __html: newcss }} />
            <div className="mycdes" ref={contentRef} dangerouslySetInnerHTML={{ __html: newhtml }} />
            </>
			
			//  : pagetype === "newproperty" ? (
      //       <>
      //         {console.log("Inside newproperty case")}
      //       </>
      //     ) 
            
			
		  :
            <>
           
            

   <div className='row' style={{ width: '65%', marginLeft: '200px', margin: 'auto', padding: '0px', marginTop: '0px', marginBottom: '40px' }}>

                          

                            <img alt="top-look"  style={{ width: "100%"}} src={`uploads/${blogData.featured_image}`} />
                           
                             <p className='mt-2'>{formatDate(blogData.date)}</p>

                            <h1 className='blogtitle'>{blogData.title}</h1>

                            <p className='all-para pt-2' dangerouslySetInnerHTML={createMarkup(blogData.content)} />
                       </div>

<div style={{width:"87%", margin:"auto"}}>


                        <div className="container news" style={{padding:"30px"}}>
                  <div className="row news-css-change">
                    <div className="col-md-12">
                      <h2 className="all-main-heading" style={{ textAlign: 'center', color: '#4e5158' }}>News & Insights</h2>
                    </div>
                  </div>
                  </div> 
                  

                  <div className="row mt-3" >
                    {blogcards.slice(0, sliceval).map((item, index) => {
                      const extractedText = extractTextFromHtml1(item.content, 'p', 0, 75);
                      const imageUrl = item.featuredHome ? `uploads/${item.featuredhome}` : `uploads/${item.featured_image}`;

                      return (
                        <>
                          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" id={item.ID}>
                            <a href={`/${item.url}`}>
                              <img src={imageUrl} alt="Los Angeles" className="img-fluid" style={{ width: "100%" }} />
                            </a>
                            <p className='' style={{ marginTop: "11px" }}>{formatDate(item.date)}</p>
                            <h1 className='all-sub-heading' style={{ textAlign: "left", marginTop: "5px" }}>{item.title}</h1>
                            <p className='all-para'>{extractedText}</p>
                          </div>
                        </>
                      )
                    })}

                  </div>


                  <div className="row">
                    <a href='/blog' style={{ textDecoration: 'none' }}>
                      <div className="col-md-12 view-more">
                        <button type="submit" className="btn btn-news">View All Posts</button>
                      </div>
                    </a>
                  </div>
</div>
                       
              

                {/* *************STAY INFORMED*************** */}

                {homedata.map((item,index)=>{
                    return(

                <div className="container-fluid newsletter" style={{ backgroundImage: `url(/uploads/${item.sec9bgimg})`, width:"100%",marginTop:"30px" }}>
                  <div className="container">

                    <h1 id="all-main-heading">{item.sec9heading}</h1>
                  
       <h3 id="stay-text" style={{textAlign:"center", color:"#fff", marginBottom:"0px"}}>{renderWithLineBreaks(item.sec9discription)}</h3>
                    <form action="/action_page.php" className="validated">
                      <div className="row ">
                        <div className="col-md-9">
                          <input onChange={(e) => setSubemail(e.target.value)} type="email" className="form-control mb-3" id="emailAdress" placeholder="Email address" name="emailAdress" style={{ borderRadius: "0px" }} required />
                          <div className="checkandmate">


                            <input type="checkbox" id="myCheck" name="remember" checked={isChecked} onChange={handleCheckboxChange} required />
                            <label className="form-check-label ml-2" htmlFor="myCheck" id="check-text" >
                              I agree to the terms & privacy policy.
                            </label>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <button type="submit" className="bg-light-grey" style={{ marginTop: "15px", borderRadius: "0px" }} onClick={SubscribeEmailGet}>{item.sec9button}</button>
                        </div>
                      </div>
                    </form>

               </div>
                </div>
                    )
                })}
            
        

            
                </>

        }

            



        </div>
    );
};

export default DynamicPage;
