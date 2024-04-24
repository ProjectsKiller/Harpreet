import React from "react";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../Context/UserContext"
import { Link } from "react-router-dom";


export default function Main(){

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

<div className="container-fluid" id="part">
<div className="block-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-6 col-sm-12">
                                <h2>Add Property
                                    <small className="text-muted">Welcome to Page</small>
                                </h2>
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                                <ul className="breadcrumb float-md-right">
                                    <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                                    <li className="breadcrumb-item active">Add Property</li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
  <div className="row clearfix box_my">
      <div className="col-lg-12">
          <div className="card">
              <div className="header">
                  <h2><strong>Basic</strong> "Information" <br /></h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                </ul>
              </div>
              <div className="body">
                  <div className="row clearfix">
{/*  <div className="logo-img">
                            <img src="/img/Logo.jpg" alt="Logo image here" />
                        </div> */}
                       
<div className="col-sm-12">
                      <div className="form_my logo-group">
                            <label for="image" className="form-label">Company Logo</label>
                            <div className="logo-img"
                            //  onClick={My}
                             >
                            <img src="/img/Logo.jpg" alt="Logo image here" />
                        </div>
                          </div>
                          </div>
                      
                      <div className="col-sm-4">
                      <div className="form_my">
                            <label htmlFor="title" className="form-label">Company Name</label>
                            <input type="text" className="form-control" /> 
                        </div>
                    </div>
                      <div className="col-sm-4">
                      <div className="form_my">
                            <label for="title" className="form-label">Property Title</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <div className="col-sm-4">
                      <div className="form_my">
                            <label for="title" className="form-label">Property Name</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    
                  </div>
              </div>
          </div>
       
          <div className="card">
              <div className="header">
                  <h2><strong>Dimensions</strong></h2>
                  <ul className="header-dropdown m-r--5">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                </ul>
              </div>
              <div className="body">
                <div className="row clearfix">
                    <div className="col-sm-4">
                    <div className="form_my">
                            <label for="title" className="form-label">Longitude</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="form_my">
                        <label for="title" className="form-label">Latitude</label>
                          <input type="text" className="form-control"/>
                      </div>
                  </div>
                    <div className="col-sm-4">
                    <div className="form_my">
                            <label for="title" className="form-label">Plot Area</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
              </div>
          </div>

          <div className="card">
            <div className="header">
                <h2><strong>Facilities</strong></h2>
                <ul className="header-dropdown">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
            <div class="row sel-box">
              <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox21" type="checkbox"/>
                      <label for="checkbox21">Swimming pool</label>
                  </div>
              </div>
              <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox22" type="checkbox"/>
                      <label for="checkbox22">Terrace</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox23" type="checkbox" checked=""/>
                      <label for="checkbox23">Dishwasher</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox24" type="checkbox" checked=""/>
                      <label for="checkbox24">Internet</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox25" type="checkbox"/>
                      <label for="checkbox25">Balcony</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox26" type="checkbox"/>
                      <label for="checkbox26">Computer</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox27" type="checkbox"/>
                      <label for="checkbox27">Cable TV</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="checkbox inlineblock">
                      <input id="checkbox28" type="checkbox" checked=""/>
                      <label for="checkbox28">Air conditioning</label>
                  </div>
                </div>
              </div>
        
           </div>

           <div className="card">
            <div className="header">
                <h2><strong>Listing </strong>"Agents"</h2>
                <ul className="header-dropdown m-r--5">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
            <div className="body">
              <div className="row clearfix">
                  <div className="col-sm-6">
                      <div className="form_my">
                      <label for="title" className="form-label">Name</label>
                          <input type="text" className="form-control" />
                      </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_my">
                    <label for="mail" className="form-label">E-mail</label>
                        <input type="mail" className="form-control" />
                    </div>
                </div>
              </div>
            </div>
        </div>

        <div className="card">
            <div className="header">
                <h2><strong>Unit</strong> "Details" <br /></h2>
                <ul className="header-dropdown">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
            <div className="body">
                <div className="row clearfix">
                    <div className="col-sm-4">
                        <div className="form_my">
                        <label for="text" className="form-label">Unit Type</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                      <label for="title" className="form-label">Unit Reference no.</label>
                          <input type="text" className="form-control" />
                      </div>
                  </div>
                    <div className="col-sm-4">
                        <div className="form_my">
                        <label for="title" className="form-label">Built up area</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form_my">
                      <label for="title" className="form-label">Permit No.</label>
                          <input type="text" className="form-control" />
                      </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form_my">
                    <label for="title" className="form-label">Reference No.</label>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="header">
                <h2><strong>Property</strong> "Area" <br /></h2>
                <ul className="header-dropdown">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
            <div  className="body">
                <div  className="row clearfix">
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Community</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                      <div  className="form_my">
                        <label for="title"  className="form-label">Emirate</label>
                          <input type="text"  className="form-control"/>
                      </div>
                  </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Primary View</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                      <div  className="form_my">
                        <label for="title"  className="form-label">Audio Tour</label>
                          <input type="text"  className="form-control"/>
                      </div>
                  </div>
                  <div  className="col-sm-3">
                    <div  className="form_my">
                        <label for="title"  className="form-label">PreviewLink</label>
                        <input type="text"  className="form-control"/>
                    </div>
                </div>
                <div  className="col-sm-3">
                    <div  className="form_my">
                        <label for="title"  className="form-label">virtual Tour</label>
                        <input type="text"  className="form-control"/>
                    </div>
                </div>
                <div  className="col-sm-3">
                    <div  className="form_my">
                        <label for="title"  className="form-label">Web Tour</label>
                        <input type="text"  className="form-control"/>
                    </div>
                </div>
                <div  className="col-sm-3">
                    <div  className="form_my">
                        <label for="title"  className="form-label">Web Tour</label>
                        <input type="text"  className="form-control"/>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="header">
                <h2><strong>Other</strong> "Information" <br /></h2>
                <ul className="header-dropdown">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
            <div  className="body">
                <div  className="row clearfix">
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Cheques</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                      <div  className="form_my">
                        <label for="title"  className="form-label">Exclusive</label>
                          <input type="text"  className="form-control"/>
                      </div>
                  </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Featured</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Fitted</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">Strno</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">QR Code</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                    <div  className="col-sm-3">
                        <div  className="form_my">
                            <label for="title"  className="form-label">price on application</label>
                            <input type="text"  className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card">
            <div className="header">
                <h2><strong>Property</strong> "Image" <br /></h2>
                <ul className="header-dropdown">
                  <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                  </li>
              </ul>
            </div>
              
              <div className="body">
                  
                  <div className="row clearfix">                            
                      <div className="col-sm-12">
                          <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data">
                          <div  className="dz-message drag-icon-cph">
                        <i  className="bi bi-hand-index-thumb"></i>
                          <div  className=""><input type="file"/></div>
                          <h3>Drop files here or click to upload.</h3>
                     </div>
                              
                          </form>
                      </div>
                      <div  className="col-sm-12">
                        <div  className="form_my">
                            <div  className="form-line ban-top">
                                <label for="title"  className="form-label">Web Remark*</label>
                                <textarea rows="2"  className="form-control no-resize" data-gramm="false" wt-ignore-input="true"></textarea>
                            </div>
                        </div>
                    </div>
                    {/* <div  className="col-sm-12 sub-opt">
                          <button type="submit"  className="btn sub-col">Submit</button>
                          <button type="submit"  className="btn btn-default can-btn">Cancel</button>
                      </div> */}
                  </div>
              </div>
          </div>
        </div>

          </div>
          </div>
          <div  className="col-sm-12 submit-opt">
  <button type="submit"  className="btn col-sub btn-round">Update</button>
</div>
  
  </main>
  {/* <!-- End #main --> */}
        
        </>
    );
}

