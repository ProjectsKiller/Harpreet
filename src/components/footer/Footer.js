import React from "react";
import '../../styles/Footer/footer.css'
import { BsTiktok } from 'react-icons/bs';

const Footer = () => {

  function VerifyPage() {
    const buy = "buy"
    localStorage.setItem("whichpage", buy)
  }

  function VerifyPag() {
    const rent = "rent"
    localStorage.setItem("whichpage", rent)
  }
  return (


    <footer className="">
      <div className="container " id="mainfooterdiv" >
        {/* **************Our Services***************** */}

        <div className="row menu-list pt-5" id="service-about">
          <div className="col-md-4 col-sm-4 col-xs-12">

            <ul className="">

              <li className="title">Our Services</li>
              <a href="/buyproperties" onClick={VerifyPage} style={{ textDecoration: 'none' }}><li>Buy</li></a>
              <a href="/rentproperties" onClick={VerifyPag} style={{ textDecoration: 'none' }}><li>Rent</li></a>
              <a href="/sale" style={{ textDecoration: 'none' }}><li>Sell</li></a>
              <a href="/buyproperties" style={{ textDecoration: 'none' }}><li>Residential</li></a>
              <a href="/mortgageservices" style={{ textDecoration: 'none' }}>   <li>Mortgage Services </li></a>
              <a href="/property&management" style={{ textDecoration: 'none' }}><li>Property Management</li></a>
              <a href="https://www.rhvacations.ae" style={{ textDecoration: 'none' }}><li>Holiday Homes</li></a>
              <a href="/advisory" style={{ textDecoration: 'none' }}><li>Advisory</li></a>
            </ul>

          </div>

          {/* **************About Us***************** */}
          <div className="col-md-4 col-sm-4 col-xs-12 center-menu">
            <ul className="">
              <li className="title">About Us</li>
              <a href="/aboutus" style={{ textDecoration: 'none' }}><li>Our Story</li></a>
              <a href="/aboutus" style={{ textDecoration: 'none' }}><li>Our Services</li></a>
              <a href="/meetmyteam" style={{ textDecoration: 'none' }}><li>Our Team</li></a>
              <a href="/career" style={{ textDecoration: 'none' }}><li>Join Us</li></a>
              <a href="/blog" style={{ textDecoration: 'none' }}><li>Latest News &amp; Videos</li></a>
              <a href="/offices" style={{ textDecoration: 'none' }}><li>Our Offices</li></a>
              <a href="/contact&us" style={{ textDecoration: 'none' }}><li>Contact</li></a>
              <a href="/faqpage" style={{ textDecoration: 'none' }}><li>FAQs</li></a>
            </ul>
          </div>

          {/* **************Our Services***************** */}
          <div className="col-md-4 col-sm-4 col-xs-12 last-menu -ml-5">
            <ul className="">
              <li className="title">Help</li>

              <a href="/privacy" style={{ textDecoration: 'none' }}><li>Privacy Policy</li></a>
              <a href="/t&c" style={{ textDecoration: 'none' }}><li>Terms and Conditions</li></a>
              <a href="/cookies" style={{ textDecoration: 'none' }}><li>Cookie Policy</li></a>
            </ul>
          </div>
        </div>

        <hr style={{ color: 'white', border: '1px solid #d6d6d6' }} />
        <div className="row">

          <div className="col-md-6 col-sm-6 col-xs-12">
            <img src="/images/footer.png" style={{ width: "250px" }} className="logo img-responsive my-1" alt="R and H logo" />

            <div className="col-md-12 h-20 mt-2" id="iconsdiv">
              <a href=" https://www.facebook.com/rhdubai/" className="grey">
                <div className="icon-container mx-2" style={{ border: '1px solid white' }}>
                  <i className="fa fa-facebook" aria-hidden="true" style={{ color: 'white' }} />
                </div>
              </a>

              <a href="https://twitter.com/rhdubai_ae/status/1120627329397604352" className="grey">
                <div className="icon-container  mx-" style={{ border: '1px solid white' }}>
                  <i className="fa fa-twitter" aria-hidden="true" style={{ color: 'white' }} />
                </div>
              </a>

              <a href=" https://www.instagram.com/raineandhornedubai/?hl=en" className="white" style={{ color: 'white' }}>
                <div className="icon-container  mx-2" style={{ border: '1px solid white' }}>
                  <i className="fa fa-instagram" style={{ color: 'white' }} aria-hidden="true" />
                </div>
              </a>

              <a href="https://www.tiktok.com/@raineandhornedubai" className="grey absolute" style={{ marginLeft: '50px' }}>
                <div className="icon-container  mx-0 p-2 x" style={{ border: '1px solid white' }}>
                  <i style={{ color: 'white' }}><BsTiktok />  </i>
                </div>
              </a>

              <a href="https://www.youtube.com/channel/UCFlQw6K63eDtSMm0ZIk4ldA" className="grey">
                <div className="icon-container  mx-0" style={{ border: '1px solid white' }}>
                  <i className="fa fa-youtube-play" aria-hidden="true" style={{ color: 'white' }} />
                </div>
              </a>

            </div>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12 text-right mt-3" id="bottom-text" >
            {/* <p className="">Privacy Policy<span className="m-1"> | </span>Terms and Conditions<span className="m-1"> | </span>Cookie Policy</p> */}
            <p className="text-whire -mt-3" style={{ fontSize: "14px" }}>© 2023 Raine &amp; Horne Dubai. All Rights Reserved.</p>
            <p className="mt-8" style={{ fontSize: "14px" }}>1904, Anantara Downtown, Business Centre, Dubai, UAE.</p>
          </div>
          <p style={{ color: "#d6d6d6", fontSize: "14px", textAlign: "center" }} id="service-about">Raine & Horne Real Estate LLC is a registered real estate brokerage company (License No.715883), located at 1904, Anantara Downtown Business Tower, Business Bay, Dubai, United Arab Emirates.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
