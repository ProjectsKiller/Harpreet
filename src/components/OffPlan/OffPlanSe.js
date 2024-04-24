import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/offplan/offplansec.css'
// import "../../styles/main/sale.css";
import axios from "axios";
import { useNavigate } from "react-router";

const OffPlanSecond = () => {
  const [newdata, setNewdata] = useState([])
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const tablename = { tablename: "newdevelopmentpagedb" }
    axios.post(`http://localhost:4000/staticdata`, tablename).then((res) => {
      setNewdata(res.data)
    });

    const tablename1 = { tablename: "newdevproperties" }
    axios.post(`http://localhost:4000/staticdata`, tablename1).then((res) => {
      setData(res.data)
    });
  }, []);

  function GetId(e) {
    const id = e.target.id;
    localStorage.setItem("newpropertyID", id);
    navigate(`/offplan&properties`)

  }

  return (

    <>
      <div className="mt-0" id="">
        {newdata.map((item, index) => {
          return (
            <>
              <h3 id="OffProperfties" className="ml-28 my-12 all-main-heading">{item.newtext}</h3>
            </>
          )
        })}



        <div class="row align-items-center" style={{ width: "87%", margin: "auto" }}>


          {data.map((item, index) => {
            const im = JSON.parse(item.GallaryArray);
            const items = im[1];
            return (

              <div className='col-4 mb-10'>

                <div className="listing-item wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.8s" style={{ visibility: 'visible', animationDuration: '2s', animationDelay: '0.8s', animationName: 'fadeInUp' }}>
                  <div className="listingItem-container en"  >

                    <div className="lazyload-wrapper">
                      <img src={`uploads/${items}`} style={{ minHeight: "300px", maxHeight: "300px", width: "100%" }} onClick={GetId} id={item.ID} />
                    </div>

                    <div className="text-container">
                      <div onClick={GetId} id={item.ID}>
                        <h2 className="item-title all-sub-heading" id="park" style={{ fontSize: '22px', maxWidth: "300px", overflow: "hidden", maxHeight: "30px", textAlign: "left" }} >{item.PropertyName} </h2>
                        <h4 className="item-location all-para" id="LocationPro" >{item.Developer}</h4>
                        <p className="all-para" style={{ marginTop: '-5px' }} >{item.Community} </p>
                        <h2 className="item-title" id="park" style={{ fontSize: '22px' }}>Starting from {item.StartingPrice}</h2>
                        <p className="all-para" style={{ marginTop: '0px' }}>Project completed in {item.Handover}</p>
                      </div>
                    </div>
                    <button className="know-btn KnowMore" style={{ width: '100%' }} onClick={GetId} id={item.ID}> Know More <i className="bi                        bi-arrow-right"></i>
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </>

  );
};

export default OffPlanSecond;