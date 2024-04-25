import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from "react-paginate";
import "../../styles/main/sale.css";
import "../../styles/main/main.css"
import axios from "axios";
import SearchContext from "../../Context/Context1";
import { useNavigate } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';


const ITEMS_PER_PAGE = 12;
const SaleDubaipro = () => {
  const getValues = useContext(SearchContext)
  const [datalength, setdatalength] = useState();
  const [tata, settata] = useState([]);
  const [jsonData, setJsonData] = useState([]);


 

  const navigate = useNavigate()

  const [dropvalue, setDropvalue] = useState('Show All');
  const [currentPage, setCurrentPage] = useState(0);
 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const name = "rentpagedb"
    const rent = {"tablename" : "buypagedb"};
          axios.post(`http://localhost:4000/staticdata` , rent).then((res) => {
          setdata(res.data);
    })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  function Singleproperty(e) {
    const id = e.target.id

    localStorage.setItem('propertyid', id)
    navigate('/singleproperty')
  }

  useEffect(() => {
    const name = "Sale"
    axios.get("http://localhost:4000/allprosale").then((res) => {
      setdatalength(res.data.length)
      // console.log(res.data.length,"og length");
      settata(res.data);
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (tata) {
        const val = tata.filter((tata) => tata.Ad_Type.includes("Sale"));
        setJsonData(val);
      }
      if (getValues.isSearch && tata && getValues.loc) {
        const searchTerm = getValues.loc;
        const regex = new RegExp(searchTerm, "i"); // Create a case-insensitive regex
        const val = tata.filter((item) => regex.test(item.Community) || regex.test(item.Property_Name));
        setdatalength(val.length)
        setFilteredData(val);
      }
      setLoading(false);; // Set loading to false when data is available
    }, 1000);
  }, [tata, getValues.isSearch, getValues.loc]);









  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [DynamicbtnStyle, setDynamicbtnStyle] = useState({
    backgroundColor: 'transparent',
    Color: '#212529',
    Border: '1px solid rgb(201, 199, 199)'
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const ToggleDropdown = (id) => {
    setIsDropdownOpen((prevId) => (prevId === id ? null : id));
  }


  const handleButtonClick = () => {


    setDynamicbtnStyle({
      backgroundColor: 'transparent',
      Color: '#212529',
      Border: '1px solid rgb(201, 199, 199)'
    });

  };
  function funmini() {
    let c = document.getElementById("allBtn")
    c.classList.toggle("mini")

  }



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const searchdata = jsonData.filter(item =>
      item.Property_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Property_Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(searchdata);
    setdatalength(searchdata.length);
  };

  function Singleproperty(e) {
    const id = e.target.id

    localStorage.setItem('propertyid', id)
    navigate('/singleproperty')
  }

  const priceList = ["750000", "1000000", "2000000", "3000000", "4000000", "5000000", "6000000", "7000000", "8000000", "9000000", "10000000", "20000000", "30000000", "40000000", "50000000", "60000000", "70000000", "80000000"]


  //Price Filteration 


  const handleMinPriceSelect = (e) => {

    setLoading(true);
    // setMinPrice(value);
    const min =e.target.value;
    console.log(min,"ok")
    setTimeout(() => {
      let filteredData;
      if (min === "Show All") {
        filteredData = jsonData;
      } else {
     
        filteredData = jsonData.filter(item => item.Price >= parseFloat(min));
        console.log(filteredData);
      }
  
      // Update state with filtered data
      setdatalength(filteredData.length);
      setFilteredData(filteredData);
  
      // Set loading state to false after filtering is done
      setLoading(false);
  
   
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  };
  const handleMaxPriceSelect = (e) => {

    setLoading(true);
    // setMinPrice(value);
    const max =e.target.value;
    console.log(max,"ok")
    setTimeout(() => {
      let filteredData;
      if (max === "Show All") {
        filteredData = jsonData;
      } else {
     
        filteredData = jsonData.filter(item => item.Price <= parseFloat(max));
        console.log(filteredData);
      }
  
      // Update state with filtered data
      setdatalength(filteredData.length);
      setFilteredData(filteredData);
  
      // Set loading state to false after filtering is done
      setLoading(false);
  
     
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  };
 
  const handleDropdownItemClick = (value) => {
    console.log(value,"wjktgdjuec");
    setDropvalue(value.target.value);
   
  };
  
 
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (tata) {
        const val = tata.filter((tata) => tata.Ad_Type.includes("Sale"));
        
        setJsonData(val);
      }
      if (getValues.isSearch && tata && getValues.loc) {
        const searchTerm = getValues.loc;
        const regex = new RegExp(searchTerm, "i"); // Create a case-insensitive regex
        const val = tata.filter((item) => regex.test(item.Community) || regex.test(item.Property_Name));
        setdatalength(val.length)
        setJsonData(val);
      }

      setLoading(false); // Set loading to false when data is available
    }, 1000);

  }, [tata, getValues.isSearch, getValues.loc]);

  const pageCount = Math.ceil(datalength / ITEMS_PER_PAGE);



  function handleSixPlusBed() {
    setDropvalue("6+");
  }


  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      let newData = [];
      console.log(dropvalue, "dropvaluess");
      if (dropvalue === "Show All") {
        
        newData = jsonData;
      }
      else if (dropvalue === "Villa") {
        newData = jsonData.filter((item) => item.Unit_Type === "Villa");
      } else if (dropvalue === "Apartment") {
        newData = jsonData.filter((item) => item.Unit_Type === "Apartment");
      } else if (dropvalue === "Townhouse") {
        newData = jsonData.filter((item) => item.Unit_Type === "Townhouse");
      } else if (dropvalue === "Penthouse") {
        newData = jsonData.filter((item) => item.Unit_Type === "Penthouse");
      
      } else if (dropvalue === "Duplex") {
        newData = jsonData.filter((item) => item.Unit_Type === "Duplex");
      
      } else if (dropvalue === "Land") {
        newData = jsonData.filter((item) => item.Unit_Type === "Land");
      
      } else if (dropvalue === "Plot") {
        newData = jsonData.filter((item) => item.Unit_Type === "Plot");
      }
      else if (dropvalue === "6+") {
        newData = jsonData.filter((item) => item.Bedrooms >= 6);
      }

      else {
        // Assuming dropvalue represents the selected number of bedrooms
        const selectedBedrooms = parseInt(dropvalue);
        newData = jsonData.filter((item) => {
          // Filter items with the selected number of bedrooms
          return parseInt(item.Bedrooms, 10) === selectedBedrooms;
        });
      
      }
      setFilteredData(newData);
      setdatalength(newData.length)
      setLoading(false); // Set loading to false when the search is completed
    }, 1000); // Simulating 2 seconds loading delay

    return () => clearTimeout(delay);
  }, [dropvalue, jsonData]);

 console.log(filteredData.length,"length of filter");
  const displayedItems = filteredData.length > 0  ? (
    filteredData
      .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
      .map((item) => {
        const im = JSON.parse(item.Imagelink);
        const items = im[1];
        console.log("in displayedItems");
        return (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4" style={{paddingRight:"0px"}} key={item.PropertyID}>
            <div className="card" id="main-div-card" style={{ borderRadius: "0px" }}>
              <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src={items} alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body" style={{ padding: '27px 27px 0px 27px' }}>
                <h5 className="card-title Cardtitle" onClick={Singleproperty} id={item.PropertyID}>{item.Property_Title}</h5>
                <p className="card-text details" style={{ marginTop: '-5px', minHeight: '10px', overflow: 'hidden' }}>
                  {item.Community}, {item.Unit_Type}.   
                </p>          
                <div className="additional-details mt-4" style={{ marginBottom: '30px',width: "100%",display: "flex" }}>
                  <div className="bed details mt-2" style={{width:"25%", display:"flex"}}>
                    <img src="/images/bedromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
						<span style={{margin:"5px"}}>{item.No_of_Rooms}</span>
						
                    <span id="spacing" style={{marginTop:"5px"}}>|</span>
                  </div>
                  <div className="bathtub details mt-2" style={{width:"25%", display:"flex"}}>
                    <img src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bathroom" />
						<span style={{margin:"5px"}}>{item.No_of_Bathroom}</span>
					
                    <span id="spacing" style={{marginTop:"5px"}}>|</span>
                  </div>
                  <div className="squre-ft details mt-2" style={{width:"50%", display:"flex"}}>
                    <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
						<span>{item.Unit_Builtup_Area}</span>
                 <span className="text-lowercase" style={{margin:"5px"}}>{item.unit_measure}</span>
                  </div>
                </div>
                <p className="price-details">AED <strong className="price-all">{formatNumberWithCommas(item.Price)}</strong></p>
              </div>
            </div>
          </div>
        );
      })
  ) :
 
      filteredData.length === 0 ? (
     
    <div style={{ justifyContent: "center" }}><h3>No Result Found!</h3></div>

  
      ) :
        (
          jsonData
            .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
            .map((item) => {
              const im = JSON.parse(item.Imagelink);
              const items = im[1];
              console.log("in jsondata condition");
              return (
                <div className="col-md-3 mb-12" key={item.PropertyID}>
                  <div className="card" id="main-div-card">
                    <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src={items} alt="Card cap" style={{ height: '210px', cursor: 'pointer' }} />
                    <div className="card-body" style={{ padding: '27px 27px 0px 27px' }}>
                      <h5 className="card-title Cardtitle" onClick={Singleproperty} id={item.PropertyID}>{item.Property_Title}</h5>
                      <p className="card-text details" style={{ marginTop: '-5px', minHeight: '10px', overflow: 'hidden' }}>
                        {item.Community}, {item.Unit_Type}.
                      </p>
                      <div className="additional-details mt-4" style={{ marginBottom: '30px',width: "100%",display: "flex" }}>
                        <div className="bed details mt-2" style={{width:"25%", display:"flex"}}>
                          <img src="/images/bedromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
							  <span style={{margin:"5px"}}>{item.No_of_Rooms}</span>
							  
                          <span id="spacing" style={{marginTop:"5px"}}>|</span>
                        </div>
                        <div className="bathtub details mt-2" style={{width:"25%", display:"flex"}}>
                          <img src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bathroom" /> <span style={{margin:"5px"}}>{item.No_of_Bathroom}</span>
                          <span id="spacing" style={{marginTop:"5px"}}>|</span>
                        </div>
                        <div className="squre-ft details mt-2" style={{width:"50%", display:"flex"}}>
                          <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" /> <span>{item.Unit_Builtup_Area}</span>
                           <span className="text-lowercase" style={{margin:"5px"}}>{item.unit_measure}</span>
                        </div>
                      </div>
                      <p className="price-details">AED <strong className="price-all">{formatNumberWithCommas(item.Price)}</strong></p>
                    </div>
                  </div>
                </div>
              );
            })
        )

  function getSelectValue(e){
   
   setDropvalue(e.target.value);
  }


  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const [data, setdata] = useState([])


  return (
    <>
      <div className="outer">
        <div id="outer-main">
          <div className='search-main'>
            <div className="SearchBar">
              <div style={{width:"95%"}}>
                <img src="/images/search.png" className='search-icon'  alt="" />
                <input className='search' type="text" placeholder='Search...' value={searchTerm} onChange={handleSearchChange}/>
              </div>
              <div className='main-btn'>
                <button id="btn-main" className='button-alter' onClick={funmini}>Filters
                </button>
              </div>
            </div>
          </div>

          <div id="allBtn" className='all-btns new-class'>
            <select className="select-input-field-change" onChange={getSelectValue} style={{width:"100%",height:"48px", padding:"5px", marginTop:"3px", outline:"none",marginRight:"5px",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>
              <option value="Show All">Show All</option>
			  <option value="Apartment">Apartment</option>
			  <option value="Villa">Villa</option>
			  <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Plot">Plot</option>
              <option value="Land">Land</option>
            </select>
            <select name="" id="" className="select-input-field-change" onChange={handleMinPriceSelect} style={{width:"100%",height:"48px", padding:"5px", marginTop:"3px", outline:"none",marginRight:"5px",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>

              <option value="Show All">Min Price</option>
              <option value="Show All">Show All</option>
            {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {formatNumberWithCommas(item)}</option>
              )
            })}
            </select>
            <select name="" id="" className="select-input-field-change" onChange={handleMaxPriceSelect} style={{width:"100%",height:"48px",marginRight:"5px",  padding:"5px", marginTop:"3px", outline:"none",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>

              <option value="Show All">Max Price</option>
              <option value="Show All">Show All</option>
            {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {formatNumberWithCommas(item)}</option>
              )
            })}
            </select>
            <select className="select-input-field-change" onChange={handleDropdownItemClick} name="" id="" style={{width:"100%",height:"48px",marginRight:"5px", padding:"5px", marginTop:"3px", outline:"none",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>
              <option value="Show All">Bedrooms</option>
              <option value="Show All">Show All</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedroom</option>
              <option value="3">3 Bedroom</option>
              <option value="4">4 Bedroom</option>
              <option value="5">5 Bedroom</option>
              <option onClick={handleSixPlusBed} value="6">6+ Bedroom</option>
            </select>



          </div>


        </div>

      </div>
      <div className="mt-5 container" id="salemaindiv">
        {data.map((item, index) => {
          return (
            <>
              <h3 id="pro-heading">{item.sec1heading} ({datalength})</h3>
            </>
          )
        })}


        {loading === true ? (

          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh" }}>
            <div >
              <div class="spinner-grow text-warning" role="status" style={{ marginRight: "10px", width: "2rem", height: "2rem" }}>
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status" style={{ marginRight: "10px", width: "2rem", height: "2rem" }}>
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status" style={{ width: "2rem", height: "2rem" }}>
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : jsonData.length >= 1 ? (
          <>

            <div className="row mb-10" id="drop-pagination">
              <div className="result-info pt-1 mt-2 col">
                Showing {currentPage * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min((currentPage + 1) * ITEMS_PER_PAGE, datalength)}{" "}
                of {" "} {datalength} result
              </div>



            </div>

            <div >

              {loading ? (
                <div style={{textAlign:"center", margin:"auto"}}>
                  <div class="spinner-grow text-warning" role="status" style={{ marginRight: "10px", width: "2rem", height: "2rem" }}>
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-warning" role="status" style={{ marginRight: "10px", width: "2rem", height: "2rem" }}>
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow text-warning" role="status" style={{ width: "2rem", height: "2rem" }}>
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) :
                displayedItems.length ? (
                //added class "my-mar" by Gagan
                  <div className="my-mar">
                    <div
                      className="row justify-content-center change-margin"
                    >
                      {displayedItems}

                    </div>
                  </div>
                ) :
                  <div style={{ alignItems: "center", textAlign: "center" }}><h3 >No result found!</h3></div>
              }

            </div>



        
  <div className="pagination-container">
  <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={1} // Display 1 page before and after current page
    pageRangeDisplayed={1} // Display only the current page
    onPageChange={handlePageClick}
    containerClassName={"pagination"}
    activeClassName={"active"}
    previousClassName={"previous-button"}
    nextClassName={"next-button"}
  />
</div>

          </>
        ) : (
          <div>
            <h1 className="text-center">No Such Search Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default SaleDubaipro;