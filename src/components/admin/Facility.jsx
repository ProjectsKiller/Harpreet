import React from "react";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
export default function Facility(){
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

<div className="container-fluid">
    <div className="block-header">
        <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Facilities
                <small className="text-muted">Welcome to Page</small>
                </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">                
                
                <ul className="breadcrumb float-md-right">
                    <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                    <li className="breadcrumb-item active">Facilities</li>
                    
                </ul>  
                              
            </div>
        </div>
    </div>

</div>

<div className="container">
	<div className="row box_my">
        <div className="col-md-12">

      

        <div  className="card">
         
          <div  className="body">
             
              <div className="row">
              <div  className="col-sm-12">
                <div  className="form_my">
                  <label for="title"  className="form-label">Facility</label>
                    <input type="text"  className="form-control"/>
                </div>
            </div>
            <div className="col-sm-12 sub-opt submit-opt">
        <button type="submit" className="btn col-sub btn-round">Update</button>
    </div>
          </div>
              </div>
      
      </div>

        
  
<div className="card">
        <div className="table-responsive">        
              <table id="mytable" className="table table-bordred table-striped mytab">
                   
                   <thead>
                   <tr className="tab-head">
                   <th>S No.</th>
                   <th>Facility</th>
                      <th>Action</th>
                    </tr>
                   </thead>
    <tbody>
    
    <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>
    <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>

    <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>  <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>

    <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>

    <tr>
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
    <td><FaRegEye className="icon-tab" />
    <TiPencil className="icon-tab" />
    <FaRegTrashAlt className="icon-tab" />
    </td>
    </tr>
    <tr>
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

      

        </div>
	</div>
   
</div>


  </main>
  {/* <!-- End #main --> */}
        </>
    );
}