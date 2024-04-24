





import React from "react";
import {useContext,useState,useEffect} from "react";
import UserContext from "../../Context/UserContext"
export default function PropertyDetail(){
    const [chgwid,setChgwid] = useState({margin : "0px 0px 15px 250px"})
    const userVal = useContext(UserContext)
    useEffect(() => {
        if (userVal.user === "Close") {
            setChgwid({ 
                "transitionDuration": "100ms",
                "transitionProperty": "margin",
                 "margin": "0px 0px 15px 0px" });
            
        } else if (userVal.user === "Open") {
            setChgwid({ 
                "transitionDuration": "500ms",
                "transitionProperty": "margin",
                "margin": "0px 0px 15px 250px" });
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
                <h2>Property Detail
                <small className="text-muted">Welcome to Compass</small>
                </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">                
                
              <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Compass</a></li>
                  <li className="breadcrumb-item"><a href="javascript:void(0);">Property</a></li>
                  <li className="breadcrumb-item active">Property Detail</li>
                  
              </ul>  
                              
            </div>
        </div>
      </div>
    </div>
    <div className="card">
        <div className="body">
        <div id="demo2" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
                <li data-target="#demo2" data-slide-to="0" className=""></li>
                <li data-target="#demo2" data-slide-to="1" className="active"></li>
                <li data-target="#demo2" data-slide-to="2" className=""></li>
            </ul>
            <div className="carousel-inner">
                <div className="carousel-item">
                    <img src="/img/5.jpg" className="img-fluid" alt=""/>
                    <div className="carousel-caption">
                        <h3>Chicago</h3>
                        <p>Thank you, Chicago!</p>
                    </div>
                </div>
                <div className="carousel-item active">
                    <img src="/img/12.jpg" className="img-fluid" alt=""/>
                    <div className="carousel-caption">
                        <h3>Los Angeles</h3>
                        <p>We had such a great time in LA!</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/img/6.jpg" className="img-fluid" alt=""/>
                    <div className="carousel-caption">
                        <h3>New York</h3>
                        <p>We love the Big Apple!</p>
                    </div>
                </div>
            </div>
            {/* <!-- Left and right controls --> */}
            <a className="carousel-control-prev" href="#demo2" data-slide="prev"><span className="carousel-control-prev-icon"></span></a>
            <a className="carousel-control-next" href="#demo2" data-slide="next"><span className="carousel-control-next-icon"></span></a>
        </div>
        </div>
    </div>
    <div className="row clearfix box_my">
        <div className="col-lg-8 col-md-12">
            
            <div className="card property_list">
                <div className="body">
                    <div className="property-content">
                        <div className="name_detail">
                            <h5 className="text-warning">$390,000 - $430,000</h5>
                            <h4 className="m-t-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h4>
                            <p className="text-muted m-t-2"><i className="bi bi-geo-alt-fill"></i>245 E 20th St, New York, NY 201609</p>
                            <p className="text-muted m-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
                        </div>
                        <div className="property-action">
                            <a href="#" title="Square Feet"><i className="bi bi-microsoft"></i><span>280</span></a>
                            <a href="#" title="Bedroom"><i className="bi bi-segmented-nav"></i><span>4</span></a>
                            <a href="#" title="Parking space"><i className="bi bi-car-front"></i><span>2</span></a>
                            <a href="#" title="Garages"><i className="bi bi-house-door-fill"></i><span> 24H</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="header">
                    <h2><strong>General</strong> Amenities<small> <br/>Description Text Here...</small></h2>
                    <ul className="header-dropdown">
                        <li className="dropdown"> <a href="javascript:void(0);" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i className="bi bi-three-dots"></i> </a>
                            <i className="bi bi-x-lg"></i>
                        </li>
                    </ul>  
                </div>
                <div className="body">
                    <div className="row clearfix">
                        <div className="col-sm-4">
                            <ul className="list-unstyled proprerty-features">
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Swimming pool</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Air conditioning</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Internet</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Radio</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Balcony</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Roof terrace</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Cable TV</li>
                            <li><i className="bi bi-check-circle-fill  text-success"></i>Electricity</li>
                        </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul className="list-unstyled proprerty-features">
                                <li><i className="bi bi-star-fill text-warning"></i>Terrace</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Cofee pot</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Oven</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Towelwes</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Computer</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Grill</li>
                                <li><i className="bi bi-star-fill text-warning"></i>Parquet</li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <ul className="list-unstyled proprerty-features">
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Dishwasher</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Near Green Zone</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Near Church</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Near Hospital</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Near School</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Near Shop</li>
                                <li><i className="bi bi-check-circle-fill  text-success"></i>Natural Gas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="header">
                    <h2><strong>Location</strong> <small>Description text here...</small> </h2>
                </div>
                <div className="body">
                    <script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-main.js" charset="UTF-8" crossorigin="*"></script><script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-vendor.js" charset="UTF-8" crossorigin="*"></script><script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-chunk-vendors.js" charset="UTF-8" crossorigin="*"></script><script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-chunk-common.js" charset="UTF-8" crossorigin="*"></script><script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-runtime.js" charset="UTF-8" crossorigin="*"></script><script src="https://embed.tawk.to/_s/v4/app/653fa0ef1ea/js/twk-app.js" charset="UTF-8" crossorigin="*"></script><script async="" src="https://embed.tawk.to/5c6d4867f324050cfe342c69/default" charset="UTF-8" crossorigin="*"></script><iframe src="https://yandex.ru/map-widget/v1/?lang=tr_TR&amp;scroll=true&amp;um=constructor%3AsvdezAlqZP2WIeKGiLW4EUnoJvnxVP7i" frameborder="0" allowfullscreen="true" width="100%" height="400px" style={{"display" : "block"}}></iframe>
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-md-12">
            
            
            <div className="card">
                <div className="header">
                    <h2><strong>Location</strong></h2>
                    <ul className="header-dropdown">
                        <li className="dropdown"> <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i className="zmdi zmdi-more"></i> </a>
                            <ul className="dropdown-menu dropdown-menu-right slideUp float-right">
                                <li><a href="javascript:void(0);">Edit</a></li>
                                <li><a href="javascript:void(0);">Delete</a></li>
                                <li><a href="javascript:void(0);">Report</a></li>
                            </ul>
                        </li>
                        <li className="remove">
                            <a role="button" className="boxs-close"><i className="zmdi zmdi-close"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="body">                        
                    <div className="table-responsive">
                        <table className="table table-bordered m-b-0">
                            <tbody>
                                <tr>
                                    <th scope="row">Price:</th>
                                    <td>$390,000</td>
                                </tr>
                                <tr>
                                    <th scope="row">Contract type: </th>
                                    <td>For Sale</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bathrooms:</th>
                                    <td>1.5</td>
                                </tr>
                                <tr>
                                    <th scope="row">Square ft:</th>
                                    <td>468</td>
                                </tr>
                                <tr>
                                    <th scope="row">Garage Spaces:</th>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <th scope="row">Land Size:</th>
                                    <td>721 m²</td>
                                </tr>
                                <tr>
                                    <th scope="row">Floors:</th>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <th scope="row">Listed for:</th>
                                    <td>15 days</td>
                                </tr>
                                <tr>
                                    <th scope="row">Available:</th>
                                    <td>Immediately</td>
                                </tr>
                                <tr>
                                    <th scope="row">Pets:</th>
                                    <td>Pets Allowed</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bedrooms:</th>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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