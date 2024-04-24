import React from "react";
import "../../styles/comp/fourelements.css";
import {GrMapLocation} from 'react-icons/gr'
import {FaSchool} from 'react-icons/fa';
import {TbBuildingHospital} from 'react-icons/tb';
import {PiTrainFill} from 'react-icons/pi';
const FourElememts = () => {
  return (
    <>
      <div id="main-row">
        <div className="commonclass">
          <div className="div4" style={{backgroundColor:"#f4f4f4"}}>
     
         <GrMapLocation className="mt-3 ml-24" style={{position:"absolute" ,fontSize:"3.6em"}}/>
          </div>
          <div className="mt-2">
            <h5 className="p-1 ml-1">Map View</h5>
            <p className="p-2 ">See nearby main streets an parks.</p>
          </div>
        </div>
        <div className="commonclass mx-2">
          <div className="div4" style={{backgroundColor:"#f4f4f4"}}>
     
         <FaSchool className="mt-3 ml-24" style={{position:"absolute" ,fontSize:"3.6em"}}/>
          </div>
          <div className="mt-2">
            <h5 className="p-1 ml-1">Schools</h5>
            <p className="p-2 ">See all nearby schools.</p>
          </div>
        </div>
        <div className="commonclass mx-2">
          <div className="div4" style={{backgroundColor:"#f4f4f4"}}>
     
         <TbBuildingHospital className="mt-3 ml-24" style={{position:"absolute" ,fontSize:"3.6em"}}/>
          </div>
          <div className="mt-2">
            <h5 className="p-1 ml-1">Hospitals</h5>
            <p className="p-2 ">See all nearby hospitals.</p>
          </div>
        </div>
        <div className="commonclass">
          <div className="div4" style={{backgroundColor:"#f4f4f4"}}>
     
         <PiTrainFill className="mt-3 ml-24" style={{position:"absolute" ,fontSize:"3.6em"}}/>
          </div>
          <div className="mt-2">
            <h5 className="p-1 ml-1">Train Satitions</h5>
            <p className="p-2 ">See all the nearby train stations.</p>
          </div>
        </div>
     
      </div>
    </>
  );
};

export default FourElememts;
