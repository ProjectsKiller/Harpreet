import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from "react-paginate";
import '../../styles/main/sale.css'
import "../../styles/main/main.css"
import axios from "axios";
import SearchContext from "../../Context/Context1";
import { useNavigate } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';



const ITEMS_PER_PAGE = 12;
const RentProperties = () => {
  const getValues = useContext(SearchContext)
  const [datalength, setdatalength] = useState();
  const [tata, settata] = useState([]);
  const [jsonData, setJsonData] = useState([]);


  const navigate = useNavigate()

  const [data, setdata] = useState([])
  
  const [dropvalue, setDropvalue] = useState('Show All');
  const [currentPage, setCurrentPage] = useState(0);
  const [color, setColor] = useState("#ffffff");
  const [Priceminlist, setPriceminlist] = useState([])
  const [loading, setLoading] = useState(false);



  const priceList = ["7000", "14000", "21000", "28000", "35000", "42000", "49000", "56000", "63000", "70000", "100000","300000", "500000", "1000000", "1500000", "2000000"];

  function handleSixPlusBed() {
    setDropvalue("6+");
  }

  useEffect(() => {
    const name = "rentpagedb"
    const rent = {"tablename" : "rentpagedb"};
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
    const name = "Rent"
    axios.get(`http://localhost:4000/allprorent`).then((res) => {
      setdatalength(res.data.length)
      console.log(res.data,"all price");
      settata(res.data);
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);


  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  
  const [filteredData, setFilteredData] = useState([]);
  
  const handleMinPriceSelect = (e) => {

    setLoading(true);
    // setMinPrice(value.target.value);
    const min=e.target.value

    setTimeout(() => {
      let filteredData;
      if (min === "Show All") {
        filteredData = jsonData;
      } else {
        filteredData = jsonData.filter(item => item.Price >= parseFloat(min));
      }
  
      // Update state with filtered data
      setdatalength(filteredData.length);
      setFilteredData(filteredData);
  
      // Set loading state to false after filtering is done
      setLoading(false);
  
      
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  };
  const handleMaxPriceSelect = (e) => {
    // Set loading state to true
    setLoading(true);
    // setMinPrice(value);
    const max = e.target.value;
    // Simulate a delay with setTimeout
    setTimeout(() => {
      let filteredData;
      if (max === "Show All") {
        filteredData = jsonData;
      } else {
        filteredData = jsonData.filter(item => item.Price <= parseFloat(max));
      }
  
      // Update state with filtered data
      setdatalength(filteredData.length);
      setFilteredData(filteredData);
  
      // Set loading state to false after filtering is done
      setLoading(false);
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  };



 
  function funmini() {
    let c = document.getElementById("allBtn")
    c.classList.toggle("mini")

  }
if(jsonData.length>0){
  const d =jsonData.map((item,index)=>{
    return item.Price;
  })
  console.log(d,"dd");
}

  function SearchResultBtn() {

    const filteredData = jsonData.filter(item =>
      item.Property_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Property_Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredData);

  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate a data fetch with a delay (replace this with actual data fetching logic)
    setTimeout(() => {
      if (tata) {
        const val = tata.filter((tata) => tata.Ad_Type.includes("Rent"));
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

  const pageCount = Math.ceil(jsonData.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  //Price Filteration 
	
	
useEffect(() => {
    setLoading(true); // Set loading to true when starting the search

    // Simulating data loading delay
    const delay = setTimeout(() => {
      let newData = [];

      if (dropvalue === "Show All") {
        newData = jsonData;
      } else if (dropvalue === "Villa") {
        newData = jsonData.filter((item) => item.Unit_Type === "Villa");
      } else if (dropvalue === "Apartment") {
        newData = jsonData.filter((item) => item.Unit_Type === "Apartment");
      } else if (dropvalue === "Townhouse") {
        newData = jsonData.filter((item) => item.Unit_Type === "Townhouse");
      } else if (dropvalue === "Penthouse") {
        newData = jsonData.filter((item) => item.Unit_Type === "Penthouse");
      }
      else if (dropvalue === "Featured"){
        console.log(jsonData,"klhd");
        newData = jsonData.filter((item) => item.Featured === "1");
        
      }
      else if (dropvalue === "Non Featured") {
        newData = jsonData.filter((item) => item.Featured === "0");
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
      console.log(newData.length, "length");
      setdatalength(newData.length)
      setLoading(false); // Set loading to false when the search is completed
    }, 1000); // Simulating 2 seconds loading delay

    return () => clearTimeout(delay);
  }, [dropvalue, jsonData]);

  const displayedItems = filteredData.length > 0 ? (
    filteredData
      .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
      .map((item) => {
        const im = JSON.parse(item.Imagelink);
        const items = im[1];
        // console.log("in displayedItems");
        return (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4" key={item.PropertyID}>
            <div className="card" id="main-div-card" style={{ borderRadius: "0px" }}>
              <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src={items} alt="Card cap" style={{ height: '210px', cursor: 'pointer', borderRadius: "0px" }} />
              <div className="card-body" style={{ padding: '25px' }}>
                <h5 className="card-title Cardtitle" onClick={Singleproperty} id={item.PropertyID}>{item.Property_Title}</h5>
                <p className="card-text details" style={{ marginTop: '-5px', minHeight: '10px', overflow: 'hidden' }}>
                  {item.Community}, {item.Unit_Type}.
                </p>
                <div className="additional-details mt-4"  style={{ margin:"20px 0px",width: "100%",display: "flex" }}>
                  <div className="bed details mt-2" style={{width:"30%",display:"flex"}}>
                    <img src="/images/bedromm.png"style={{width:"28px",objectFit:"contain"}} alt="bedroom" /><span style={{margin:"5px"}}>{item.No_of_Rooms}</span>
                    <span style={{marginTop:"5px"}} id="spacing">|</span>
                  </div>
                  <div className="bathtub details mt-2" style={{width:"25%",display:"flex"}}>
                    <img src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" /><span style={{margin:"5px"}}>{item.No_of_Bathroom}</span>
                    <span style={{marginTop:"5px"}} id="spacing">|</span>
                  </div>
                  <div className="squre-ft details mt-2" style={{width:"45%",display:"flex"}}>
                    <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
                    <span style={{margin:"5px"}}>{item.Unit_Builtup_Area}</span>
<span className="text-lowercase" style={{marginTop:"5px"}}>{item.unit_measure}</span>
                  </div>
                </div>
                <p className="price-details">AED <strong className="price-all">{formatNumberWithCommas(item.Price)}</strong></p>
              </div>
            </div>
          </div>
        );
      })
  ) :
    searchResults.length > 0 ? (
      searchResults
        .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
        .map((item) => {
          const im = JSON.parse(item.Imagelink);
          const items = im[1];
          // console.log("in Search results");
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
                    <div className="bed details mt-2" style={{width:"30%",display:"flex"}}>
                      <img src="/images/bedromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
						  <span style={{margin:"5px"}}>{item.No_of_Rooms}</span>
                      <span style={{marginTop:"5px"}} id="spacing">|</span>
                    </div>
                    <div className="bathtub details mt-2" style={{width:"25%",display:"flex"}}>
                      <img  src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" /><span style={{margin:"5px"}}>{item.No_of_Bathroom}</span>
                      <span  style={{marginTop:"5px"}} id="spacing">|</span>
                    </div>
                    <div className="squre-ft details mt-2" style={{width:"45%",display:"flex"}}>
                      <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
                      <span style={{margin:"5px"}}>{item.Unit_Builtup_Area}</span>
<span className="text-lowercase" style={{marginTop:"5px"}}>{item.unit_measure}</span>
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
              // console.log("in jsondata condition");
              return (
                <div className="col-md-3 mb-12" key={item.PropertyID}>
                  <div className="card" id="main-div-card">
                    <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src={items} alt="Card cap" style={{ height: '210px', cursor: 'pointer' }} />
                    <div className="card-body" style={{ padding: '27px 27px 0px 27px' }}>
                      <h5 className="card-title Cardtitle" onClick={Singleproperty} id={item.PropertyID}>{item.Property_Title}</h5>
                      <p className="card-text details" style={{ marginTop: '-5px', minHeight: '10px', overflow: 'hidden' }}>
                        {item.Community}, {item.Unit_Type}.
                      </p>
                      <div className="additional-details mt-4" style={{ marginBottom: '30px' }}>
                        <div className="bed details mt-2">
                          <img  src="/images/bedromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />{item.No_of_Rooms}
                          <span style={{marginTop:"5px"}} id="spacing">|</span>
                        </div>
                        <div className="bathtub details mt-2">
                          <img  src="/images/bathromm.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />{item.No_of_Bathroom}
                          <span style={{marginTop:"5px"}} id="spacing">|</span>
                        </div>
                        <div className="squre-ft details mt-2">
                          <img src="/images/Sizee.png" style={{width:"28px",objectFit:"contain"}} alt="bedroom" />
                          {item.Unit_Builtup_Area} <span className="text-lowercase">{item.unit_measure}</span>
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


  const handleDropdownItemClick = (value) => {
    setDropvalue(value.target.value);
  };

  return (
	  <>
	     <div className="outer">
    <div id="outer-main">
      <div className='search-main'>
        <div className="SearchBar">
        <div style={{width:"95%"}}>
        <img src="/images/search.png" className='search-icon' onClick={SearchResultBtn} alt="" />
            <input className='search' type="text" placeholder='Search...' value={searchTerm} onChange={handleSearchChange} />
        </div>
          <div className='main-btn'>
            <button id="btn-main" className='button-alter' onClick={funmini}>Filter
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
            <select className="select-input-field-change" name="" id="" onChange={handleMinPriceSelect} style={{width:"100%",height:"48px", padding:"5px", marginTop:"3px", outline:"none",borderRight: "10px solid transparent",borderLeft: "10px solid transparent",marginRight:"6px"}}>

              <option value="Show All">Min Price</option>
              <option value="Show All">Show All</option>
            {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {formatNumberWithCommas(item)}</option>
              )
            })}
            </select>
            <select className="select-input-field-change" name="" id="" onChange={handleMaxPriceSelect} style={{width:"100%",height:"48px",marginRight:"5px",  padding:"5px 20px 5px 5px", marginTop:"3px", outline:"none",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>

              <option value="Show All">Max Price</option>
              <option value="Show All">Show All</option>
            {priceList.map((item,index)=>{
              return(
                <option value={item}>AED {formatNumberWithCommas(item)}</option>
              )
            })}
            </select>
            <select className="select-input-field-change" onChange={handleDropdownItemClick} name="" id="" style={{width:"100%",height:"48px",marginRight:"5px", padding:"5px 10px 5px 5px", marginTop:"3px", outline:"none",borderRight: "10px solid transparent",borderLeft: "10px solid transparent"}}>
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
      {/* <div id="allBtn" className='all-btns new-class'>
        <Dropdown show={isDropdownOpen === '1'} onClick={() => ToggleDropdown('1')}>
          <Dropdown.Toggle
            style={{
              backgroundColor: DynamicbtnStyle.backgroundColor,
              color: DynamicbtnStyle.Color,
              border: DynamicbtnStyle.Border,
              fontWeight:"normal!important"
            }}
            onClick={handleButtonClick}
            className='button-main'
          >
            Property Type
          </Dropdown.Toggle>
          <Dropdown.Menu className='drop-section' >
            <Dropdown.Item
              style={{
                backgroundColor: Dropdownchange.backgroundColor,
                color: Dropdownchange.color
              }}
              onClick={() => handleDropdownItemClick('Show All')}>
              Show All
            </Dropdown.Item>
            <Dropdown.Item href="#" style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick('Villa')}>
              Villa
            </Dropdown.Item>
            <Dropdown.Item href="#" style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick('Penthouse')}>
              Penthouse
            </Dropdown.Item>
            <Dropdown.Item href="#" style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick('Townhouse')}>
              Townhouse
            </Dropdown.Item>
            <Dropdown.Item href="#" style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick('Apartment')}>
              Apartment
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={isDropdownOpen === '2'} onClick={() => ToggleDropdown('2')}>
          <Dropdown.Toggle
            style={{ backgroundColor: DynamicbtnStyle.backgroundColor, color: DynamicbtnStyle.Color, border: DynamicbtnStyle.Border }}
            onClick={handleButtonClick}
            className='button-main'
          // id="dropdown-basic"
          >
            Price Min
          </Dropdown.Toggle>

          <Dropdown.Menu className='drop-section' style={{ overflowY:"scroll", height:"300px"}}>
            <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleMinPriceSelect('Show All')}>Show All</Dropdown.Item>
            {priceList.map((item, index) => {
                  return (
                    <Dropdown.Item
                      style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }}
                      key={index}
                      onClick={() => handleMinPriceSelect(item)}
                    >
                      AED {formatNumberWithCommas(item)}
                    </Dropdown.Item>
                  )
                })}

          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown show={isDropdownOpen === '3'} onClick={() => ToggleDropdown('3')}>
          <Dropdown.Toggle
            style={{ backgroundColor: DynamicbtnStyle.backgroundColor, color: DynamicbtnStyle.Color, border: DynamicbtnStyle.Border }}
            onClick={handleButtonClick}
            className='button-main'
          >
            Price Max
          </Dropdown.Toggle>

          <Dropdown.Menu className='drop-section' style={{ overflowY:"scroll", height:"300px"}}>
            <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleMaxPriceSelect('Show All')}>Show All</Dropdown.Item>
            {priceList.map((item, index) => {
                  return (
                    <Dropdown.Item
                      style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }}
                      key={index}
                      onClick={() => handleMaxPriceSelect(item)}
                    >
                      AED {formatNumberWithCommas(item)}
                    </Dropdown.Item>
                  )
                })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={isDropdownOpen === '4'} onClick={() => ToggleDropdown('4')}>
              <Dropdown.Toggle
                style={{ backgroundColor: DynamicbtnStyle.backgroundColor, color: DynamicbtnStyle.Color, border: DynamicbtnStyle.Border }}
                onClick={handleButtonClick}
                className='button-main'
              >
                Beds
              </Dropdown.Toggle>
              <Dropdown.Menu className='drop-section'>
                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownSelectAll('Show All')}>Show All</Dropdown.Item>
                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick(1)}>
                  1 Bedrooms
                </Dropdown.Item>

                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick(2)}>
                  2 Bedrooms
                </Dropdown.Item>

                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick(3)}>
                  3 Bedrooms
                </Dropdown.Item>

                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick(4)}>
                  4 Bedrooms
                </Dropdown.Item>

                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={() => handleDropdownItemClick(5)}>
                  5 Bedrooms
                </Dropdown.Item>

                <Dropdown.Item style={{ backgroundColor: Dropdownchange.backgroundColor, color: Dropdownchange.color }} onClick={handleSixPlusBed}>
                  6 + Bedrooms
                </Dropdown.Item>

              </Dropdown.Menu>

            </Dropdown>


        

      </div> */}


    </div>

  </div>
	  
    <div className="container" id="salemaindiv">
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
        <div className="cards-change-margin">
          <div
            className="row"
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
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      nextClassName={"next-button"}
    />
  </div>

</>
) : (
<div>
  {/* <h1 className="text-center">No Such Search Found</h1>/ */}
</div>
)}

    </div>
	</>
  );
};

export default RentProperties;