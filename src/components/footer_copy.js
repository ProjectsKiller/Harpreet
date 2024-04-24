import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import './mystyle.css';



const Footer = () => {
  const [footerData, setFooterData] = useState({
    menus: [],
    socialMedia: [],
    additionalInfo: {},
    logo: ''
  });
 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Styled components for footer
const FooterContainer = styled.footer`
background-color: ${footerData.additionalInfo ? footerData.additionalInfo.backgroundColor : '#343a40'};
color: white;
padding-top:15px;
font-family: ${footerData.additionalInfo ? footerData.additionalInfo.fontFamily : 'Arial, sans-serif'};
font-size: ${footerData.additionalInfo ? footerData.additionalInfo.fontSize : '14px'};



`;

const MenuSection = styled.div`
display: flex;
justify-content: space-around;
margin-bottom: 20px;
`;

const SocialMediaSection = styled.div`
margin-bottom: 20px;
`;



  useEffect(() => {
    axios.get('https://localhost:4000/api/get-footer-settings')
      .then(response => {
        const data = response.data;
        // Parse menus and social media data from JSON strings
        data.menus = data.menus ? JSON.parse(JSON.parse(data.menus)) : [];
        data.socialMedia = data.social_media ? JSON.parse(JSON.parse(data.social_media)) : [];
        data.additionalInfo = data.additional_info ? JSON.parse(JSON.parse(data.additional_info)) : {};
        setFooterData(data);
        setIsLoading(false);

      })
      .catch(error => {
        console.error('Error fetching footer settings:', error);
        setError('Error fetching footer data');
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return <FooterContainer>Loading footer...</FooterContainer>;
  }

  if (error) {
    return <FooterContainer>Error loading footer: {error}</FooterContainer>;
  }

  const { menus, socialMedia, additionalInfo, logo } = footerData;

  return (
    <FooterContainer>
    <div className="container mycotf">
      <div className="row">
        {Array.isArray(menus) && menus.map((menu, index)  => (
          <div className="col-md-4 col-sm-4 col-xs-12 menulinks" key={index}>
           
            <ul>
              <li className="title"> {menu.title}</li>
            {menu.links && menu.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} style={{ color: 'inherit', fontSize:'14px', lineHeight: '23px' , textDecoration : "none"}}>{link.name}</a>
              </li>
            ))}

            </ul>
          </div>
        ))}
        </div>
     </div>

      <div className="container">
      <hr className="footline"/>

      <div className="row">
       
        <div className="col-md-6 col-sm-6 col-xs-12">
            {logo && <img src={`uploads/${logo}`} className="logo img-responsive my-1" alt="R and H logo"   width="250px"/>}
            
            <div className="col-md-12 h-20 mt-2" id="iconsdiv">

            {Array.isArray(socialMedia) && socialMedia.map((media, idx) => (
          <a key={idx} href={media.url} className="greyicons" style={{textDecoration : "none"}}>
             <div className="icon-container mx-2" >
           <i className={`fa  ${media.name}`} aria-hidden="true" ></i>
           </div>
          </a>
        ))}
              
              
              
            </div>
         </div>
         <div className="col-md-6 col-sm-6 col-xs-12 text-right mt-3" id="bottom-text">
             <p className="text-whire -mt-3 mycenter" >
             {additionalInfo.copyright}
              </p>
              <p className="mt-8 mycenter" >{additionalInfo.address}</p>
              </div>
              </div>
           <div className="row">   
          <p id="service-about" className=' mycenter'>{additionalInfo.bottomText}</p></div>
      </div>
     

 
 

    </FooterContainer>
  );

  
};




export default Footer;
