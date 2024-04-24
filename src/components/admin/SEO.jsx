import React from "react";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";

export default function SEO(){
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
  
  <div className="container-fluid">
      <div className="block-header">
          <div className="container">
          <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                  <h2>SEO Information
                  <small className="text-muted">Welcome to Page</small>
                  </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">                
                  
                  <ul className="breadcrumb float-md-right">
                      <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Compass</a></li>
                      <li className="breadcrumb-item active">SEO Information</li>
                      
                  </ul>  
                                
              </div>
          </div>
        </div>
      </div>
    <div className="row clearfix space-cont box_my">
        <div className="col-lg-12">
         
      
  <div className="card">
                <div className="header">
                    <h2><strong>Home</strong> "Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Properties</strong></h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>About</strong> "Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Advisory</strong> "Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Join Us</strong> "Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Sell </strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Buy</strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Mortgage Services</strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Property Management</strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Why Choose Us</strong> "Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>FAQ </strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
            <div className="card">
                <div className="header">
                    <h2><strong>Commercial</strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
          
  
            <div className="card">
                <div className="header">
                    <h2><strong>Facility </strong>"Page"</h2>
                    <ul className="header-dropdown">
                      <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                      </li>
                  </ul>
                </div>
                <div className="body">
                    <div className="row clearfix">
                      <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Title</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                        <label for="title" className="form-label">SEO Meta Description</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                          <label for="title" className="form-label">SEO Keyword</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                      
                    
                    </div>
                </div>
            </div>
  
        </div>
    </div>
  </div>
  <div className="col-sm-12 submit-opt">
    <button type="submit" className="btn col-sub btn-round">Update</button>
  </div>
  
    </main>
    {/* <!-- End #main --> */}
        </>
    );
}