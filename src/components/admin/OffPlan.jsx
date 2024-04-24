import React from "react";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";
export default function OffPlan(){
  const [chgwid, setChgwid] = useState({"margin": "66px 0px 15px 250px"})
  const userVal = useContext(UserContext)
  useEffect(() => {
      if (userVal.user === "Close") {
          setChgwid({
              "transitionDuration": "300ms",
              "transitionProperty": "margin",
              "margin": "66px 0px 15px 0px"
          });

      } else if (userVal.user === "Open") {
          setChgwid({
              "transitionDuration": "500ms",
              "transitionProperty": "margin",
              "margin": "66px 0px 15px 250px"
          });
      }
  }, [userVal.user]);


  return(
      <>
<main id="whole" style={chgwid}>
  

{/* <!-- box --> */}

<div class="container-fluid">
    <div class="block-header">
        <div class="container">
        <div class="row">
            <div class="col-lg-7 col-md-6 col-sm-12">
                <h2>Off Plan
                <small class="text-muted">Welcome to Page</small>
                </h2>
            </div>
            <div class="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">                
                
                <ul class="breadcrumb float-md-right">
                    <li class="breadcrumb-item"><a href="index.html"><i class="bx bx-home"></i> Page</a></li>
                    <li class="breadcrumb-item active">Off Plan</li>
                    
                </ul>  
                              
            </div>
        </div>
      </div>
    </div>
  <div class="row clearfix box_my">
      <div class="col-lg-12">

        <div class="card">
          <div class="header">
              <h2><strong>Section</strong> "Information"</h2>
              <ul class="header-dropdown">
                <li class="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
                </li>
            </ul>
          </div>
          <div class="body">
              <div class="row clearfix">
              
                <div class="col-sm-12">
                  <div class="form_my">
                    <label for="title" class="form-label">Main Heading</label>
                      <input type="text" class="form-control"/>
                  </div>
                </div>
              </div>
          </div>
      </div>

         
      </div>
  </div>
</div>

<div class="col-sm-12 submit-opt">
  <button type="submit" class="btn col-sub btn-round">Update</button>
</div>
  </main>
  {/* <!-- End #main --> */}
        </>
    );
}