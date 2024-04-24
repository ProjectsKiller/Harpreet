import React from "react";
import {useContext,useState,useEffect} from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";

export default function PropertyList(){
    const [chgwid,setChgwid] = useState({margin : "90px 0px 15px 250px"})
    const userVal = useContext(UserContext)
    useEffect(() => {
        if (userVal.user === "Close") {
            setChgwid({ 
                "transitionDuration": "100ms",
                "transitionProperty": "margin",
                 "margin": "90px 0px 15px 0px" });
            
        } else if (userVal.user === "Open") {
            setChgwid({ 
                "transitionDuration": "500ms",
                "transitionProperty": "margin",
                "margin": "90px 0px 15px 250px" });
        }
    }, [userVal.user]);
    return(
        <>
         <main id="whole" style={chgwid}>


{/* <!-- box --> */}

<div className="container-fluid" id="part">
    <div className="row clearfix">

    <div  className="col-md-12">
        <div  className="table-responsive">
              <table id="mytable"  className="table table-bordred table-striped">
                   
                   <thead>
                   <tr  className="tab-head">
                   <th>S No.</th>
                   <th>Property name</th>
                    <th>Property title</th>
                     <th>Primary view</th>
                     <th>Community</th>
                     <th>Price</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                   </thead>
    <tbody>
    
    <tr>
      <td>1</td>
    <td>Loss Angel</td>
    <td>xyz</td>
    <td>yes</td>
    <td>multiple</td>
    <td>$4500</td>
    <td>3.5</td>
   
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>
    
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
      </tr>

      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
            </td>
            </tr>
    
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
              </td>
              </tr>
    
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                  </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                    </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                      </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                        </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
 
                          </td>
                          </tr> 
    
    </tbody>
        
</table> 
            </div>
        </div>

        <div  className="col-sm-12 sub-opt submit-opt">
        <button type="submit"  className="btn col-sub btn-round">Add More</button>
    </div>

        <div className="col-lg-12 box_my">
            <Link to="/PropertyDetail">
            <div className="card property_list">
                <div className="body">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="property_image" >
                                <img className="img-thumbnail img-fluid" src="/img/1.jpg" alt="img"/>
                                <span className="badge badge-danger">For Sale</span>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6">
                            <div className="property-content">
                                <div className="detail">
                                    <h5 className="text-warning">$390,000 - $430,000</h5>
                                    <h4 className="m-t-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h4>
                                    <p className="text-muted m-t-2"><i className="bi bi-geo-alt-fill"></i>245 E 20th St, New York, NY 201609</p>
                                    <p className="text-muted m-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
                                </div>
                                <div className="property-action m-t-15">
                                    <a href="#" title="Square Feet"><i className="bi bi-microsoft"></i><span>280</span></a>
                                    <a href="#" title="Bedroom"><i className="bi bi-segmented-nav"></i><span>4</span></a>
                                    <a href="#" title="Parking space"><i className="bi bi-car-front"></i><span>2</span></a>
                                    <a href="#" title="Garages"><i className="bi bi-house-door-fill"></i><span> 24H</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    </div>
</div>


  </main>
  {/* <!-- End #main --> */}
        </>
    );
}

