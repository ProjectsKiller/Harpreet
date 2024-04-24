import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import axios from "axios";
import {IoIosArrowForward} from 'react-icons/io'
import {IoIosArrowBack} from 'react-icons/io'

import '../../styles/main/testmo.css'
const NextArrow = ({ onClick }) => (
    <div className="custom-next-arrow" onClick={onClick}>
      {/* Your custom next arrow content */}
      <div className="arrow-right">
      <IoIosArrowForward style={{color:"#212529", fontSize:"1.5rem"}}/>
    </div>
    </div>
  );
  
  const PrevArrow = ({ onClick }) => (
    <div className="custom-prev-arrow" onClick={onClick}>
     <div className="arrow-left">
      <IoIosArrowBack style={{color:"#212529", fontSize:"1.5rem"}} />
   </div>
   </div>
  );

const Testomonials = () => {
    const [testomonialdata, settestomonialdata] = useState([])
    var settingstwo = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        customPaging: function (i) {
            return (
              <div className="custom-dots">
              </div>
            );
          },
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
       
  
    };
  
    useEffect(() => {
        const homedata = {"tablename" : "testimonials"}
        axios.post('http://localhost:4000/staticdata', homedata).then((res) => {
        settestomonialdata(res.data)
      })
    }, []);

    return (
        <>
             <Slider  className='p-4' {...settingstwo} style={{ backgroundColor: 'transprant' , maxHeight : "170px"}}>
                       {testomonialdata.map((item,key)=>{
                        return (
                       <>
                        <p className="all-para" style={{textAlign :"center" , maxHeight : "150px" , overflow : "hidden"}}>{item.Review}</p>
                    </>
                    )
                  })}
            </Slider>
        </>
    )
}

export default Testomonials
