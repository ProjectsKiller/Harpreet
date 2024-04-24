import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/main/sale.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function SaleDubaiPro() {


    const [buttonText, setButtonText] = useState('Filter');

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth <= 500 && window.innerWidth >= 200) {
          setButtonText('☰'); // Three line icon
        } else {
          setButtonText('Filter');
        }
      }
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    function funmini() {
        let c = document.getElementById("allBtn")
        c.classList.toggle("mini")
    
      }

    const priceList = ["750000", "1000000", "2000000", "3000000", "4000000", "5000000", "6000000", "7000000", "8000000", "9000000", "10000000", "20000000", "30000000", "40000000", "50000000", "60000000", "70000000", "80000000"]


  return (
    <div>
        <div className="filters-div">
           <div className="row decorative-class">
           <div className="col-9 col-sm-9 col-md-9 col-lg-4 search-bar-tab-ext">
           <img src="/images/search.png" className='search-icon-2'  alt="" />
                <input className="search-filter" type="text" placeholder="Search"/>
            </div>
            
            <div className="after-alter-btn col-2 col-sm-2 col-md-3">
           <button id="btn-main" className='button-alter' onClick={funmini}>{buttonText}
                </button>
           </div>

           <div id="allBtn" className="col-8 new-change-1024">
            <div className="button-total">
                <div className="row special-class" style={{padding:"0px !important"}}>
                <div className="col-3 space-cover">
                <select name="" id="" className="type-of-prop">
                <option value="Show All">Show All</option>
			  <option value="Apartment">Apartment</option>
			  <option value="Villa">Villa</option>
			  <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Plot">Plot</option>
              <option value="Land">Land</option>
                </select>
            </div>
            <div className="col-3 space-adjust">
                <select name="" id="" className="type-of-prop">
                <option value="Show All">Min Price</option>
              <option value="Show All">Show All</option>
                {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {item}</option>
              )
            })}
                </select>
            </div>
            <div className="col-3 space-adjust">
                <select name="" id="" className="type-of-prop">
                <option value="Show All">Max Price</option>
              <option value="Show All">Show All</option>
                {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {item}</option>
              )
            })}
                </select>
            </div>
            <div className="col-3 space-adjust" >
            <select name="" id="" className="type-of-prop">
            <option value="Show All">Bedrooms</option>
              <option value="Show All">Show All</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedroom</option>
              <option value="3">3 Bedroom</option>
              <option value="4">4 Bedroom</option>
              <option value="5">5 Bedroom</option>
            </select>
            </div>
                </div>
            </div>
           </div>

           



           </div>
        </div>
        
      <div className="stylo-new">
        <h3 className='stylo-head'>Properties For Sale in Dubai</h3>
        <div className="newgrid">
            <h3 className='resultent-head'>Showing 1-20 of 20 Results</h3>
        </div>


        {/* card design  */}
        <div className="row stylo-card-row">
       
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3" >
            <div className="card-inner-stylo">
              <img className="card-img-top" src="/images/demo.jpeg" alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body-stylo">
                <h5 className="card-title Cardtitle">Price Reduced| Burj and Fountain View|06 Unit</h5>
                <p className=" fix-font-stylo" >
                  Downtown Dubai, Apartment.
                </p>
                <div className="add-more-details" >
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bed.JPG" className="mr-1 " />3
                    <span id="vert-line">|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/bathtub.JPG" className="mr-1" />4
                    <span id="vert-line" >|</span>
                  </div>
                  <div className="horizontal-stylo fix-font-stylo">
                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                    1568.00<span>sq.ft.</span>
                  </div>
                </div>
                <p className="price-stylo">AED <strong className="price-inner">4,799,000</strong></p>
              </div>
            </div>
          </div>

            

            
            
        </div>
        {/* card design  */}


       




        </div>
      </div>
    
  )
}

export default SaleDubaiPro