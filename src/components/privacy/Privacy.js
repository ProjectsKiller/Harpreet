import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import '../../styles/privacy/privacy.css'

const Privacy = () => {
  const [data, setdata] = useState([])
  const createMarkup = (html) => ({ __html: html });


  useEffect(() => {
    const tablename = "privacy"
   const privacy = {"tablename" : "privacy"};
          axios.post(`http://localhost:4000/staticdata` , privacy).then((res) => {
      setdata(res.data);
    })
  }, []);

  return (
    <>
      <div>

        {data.map((item, index) => {
          return (
            <>

              <section className="privacy">
                <div className="container">
                  <p className='all-para' dangerouslySetInnerHTML={createMarkup(item.privacytext)} />
                  {/* <h3 className='privacy-headings'>PRIVACY POLICY</h3>
            <p className='privacy-details'>
              Welcome to Raine and Horne Real Estate LLC's Privacy Policy. This document outlines our policies and procedures for collecting, using, and disclosing your information when you use our services. It also informs you about your privacy rights and legal protections.

            </p> */}


                  {/* <h3 className="mt-5 all-sub-heading" style={{ textAlign: 'left' }}>Definitions: For the purposes of this Privacy Policy:</h3>
            <li className="my-4 m-text" >
              <span>Account: </span>
              Refers to a unique account created for you to access our Service.

            </li>

            <li className="my-4 m-text">

              <span>Company: </span>
              Refers to Raine and Horne Real Estate LLC.

            </li>

            <li className="my-4 m-text">

              <span>Cookies: </span>
              Small files placed on your computer, mobile device, or any other device by a website,
              containing details of your browsing history on that website.

            </li>

            <li className="my-4 m-text">

              <span>Country: </span>
              Refers to the United Arab Emirates.


            </li>

            <li className="my-4 m-text">

              <span>Device: </span>
              Means any device that can access the Service.

            </li>

            <li className="my-4 m-text">

              <span>Personal Data: </span>
              Includes information related to an identified or identifiable individual.

            </li>

            <li className="my-4 m-text">

              <span>Service: </span>
              Refers to the Website.


            </li>

            <li className="my-4 m-text">

              <span>Service Provider: </span>
              Refers to any natural or legal person processing data on behalf of the Company.
              Usage Data: Refers to data collected automatically during Service use.

            </li>

            <li className="my-4 m-text">

              <span>Website: </span>
              Refers to Raine and Horne Real Estate LLC, accessible from rhdubai.ae.


            </li>

            <li className="my-4 m-text">

              <span>You: </span>
              Means the individual or legal entity accessing or using the Service.


            </li>

            <div>
              <h3 className='all-sub-heading' style={{ textAlign: 'left' }}>Collecting and Using Your Personal Data:</h3>
              <h4 className='all-sub-heading my-3' style={{ textAlign: 'left' }}>Types of Data Collected:</h4>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  <span>Personal Data: </span>
                  While using our Service, we may request certain personally identifiable information, including but not limited to:


                </li>
                <div className='ml-8 my-2' >
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Email address</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>First name and last name</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Phone number</li>
                </div>
                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  <span>Usage Data: </span>
                  Automatically collected during Service use, may include information like
                  Your Device’s Internet Protocol address, browser type, pages visited, and other
                  diagnostic data.
                </li>
              </ul>
            </div>



            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Tracking Technologies and Cookies:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We use cookies and similar tracking technologies to enhance Service functionality. These may include:
                </li>

                <div className='ml-8 my-2'>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Necessary/Essential Cookies</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Cookies Policy/Notice Acceptance Cookies</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Functionality Cookies</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>For details, visit our Cookies Policy.</li>
                </div>
                <li style={{ listStyleType: 'disc' }} className=" m-text all-para">
                  <span>Usage Data: </span>
                  Automatically collected during Service use, may include information like Your Device’s Internet Protocol address, browser type, pages visited, and other diagnostic data.</li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}> Use of Your Personal Data:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }}>The Company may use Personal Data for various purposes, including:</li>

                <div className='ml-8 my-2'>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Providing and maintaining the Service</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Managing Your Account</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Contacting You for updates or informative communications</li>
                  <li className='all-para' style={{ listStyleType: 'disc' }}>Providing news, special offers, and general information about our goods and services
                  </li>
                </div>

                <li style={{ listStyleType: 'disc' }} className="m-text">
                  We may share Your information in specific situations, such as with Service Providers, affiliates, business partners, or when required by law.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Specific Purposes for Data Collection:</span>
              <ul className='privacy-details'>
                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We collect personal data for specific purposes, including customer support, business analytics, personalized marketing, and compliance with legal obligations.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>User Rights:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  Users have the right to access, correct, delete, or request the transfer of their personal data. Requests can be made through our contact details provided below.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Opt-Out Options:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  Users can opt-out of marketing communications and certain data processing activities by using the unsubscribe link in emails or contacting us directly.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Retention of Your Personal Data:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We retain Your Personal Data as necessary for the stated purposes and comply with legal obligations.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Transfer of Your Personal Data:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  Your information, including Personal Data, may be processed outside Your jurisdiction. By submitting information, You agree to this transfer. We take necessary steps to ensure secure data treatment and adherence to this Privacy Policy.
                </li>
              </ul>
            </div>


            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Disclosure of Your Personal Data:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We may disclose Your Personal Data in business transactions, law enforcement situations, or to meet other legal requirements.
                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Security of Your Personal Data:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  While We strive for secure data transmission, no method is 100% secure. We use commercially acceptable means to protect Your data.
                </li>
              </ul>
            </div>


            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Children’s Privacy:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  Our Service is not intended for users under 13. If You are a parent or guardian and Your child provides Us with Personal Data, please Contact Us.

                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Links to Other Websites:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We have no control over third-party sites and recommend reviewing their Privacy Policies.

                </li>
              </ul>
            </div>

            <div className='my-4'>
              <span className='all-sub-heading my-1' style={{ textAlign: 'left' , fontSize : "18px" }}>Changes to this Privacy Policy:</span>
              <ul className='privacy-details'>

                <li style={{ listStyleType: 'disc' }} className="m-text all-para">
                  We may update Our Privacy Policy, and changes become effective when posted. We will notify You via email or a notice on Our Service.
                </li>

                <li className="m-text all-para">
                  For questions about this Privacy Policy, contact us at info@rhdubai.ae

                </li>
              </ul> */}
                  {/* </div> */}

                </div>
              </section>

            </>
          )
        })}

      </div>
    </>
  )
}

export default Privacy
