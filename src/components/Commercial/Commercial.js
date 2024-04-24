
import React, { useState, useEffect, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from "react-paginate";
import "../../styles/main/sale.css";
import axios from "axios";
import SearchContext from "../../Context/Context1";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 12;
const Commercial = () => {
    const getValues = useContext(SearchContext)
    const [tata, settata] = useState([]);
    const [jsonData, setJsonData] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [dropvalue, setDropvalue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate()

    function Singleproperty(e) {
        const id = e.target.id

        localStorage.setItem('propertyid', id)
        navigate('/singleproperty')
    }

    useEffect(() => {
        const name = "Sale"
        axios.get(`http://localhost:4000/datafetch/${name}`).then((res) => {
          
            settata(res.data);
            setIsLoading(false);

        })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        // Simulate a data fetch with a delay (replace this with actual data fetching logic)
        setTimeout(() => {
            if (tata) {
                const val = tata.filter((tata) => tata.Ad_Type.includes("Sale"));
                setJsonData(val);
                console.log(val, "jsondaaa");
            }
            if (getValues.isSearch && tata && getValues.loc) {
                const searchTerm = getValues.loc;
                const regex = new RegExp(searchTerm, "i"); // Create a case-insensitive regex
                const val = tata.filter((item) => regex.test(item.Community) || regex.test(item.Property_Name));
                
                setJsonData(val);
            }

            setIsLoading(false); // Set loading to false when data is available
        }, 1000);
    }, [tata, getValues.isSearch, getValues.loc]);

    const pageCount = Math.ceil(jsonData.length / ITEMS_PER_PAGE);





    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const sortJsonData = () => {
        if (dropvalue === 'Price-Low to High') {
            return jsonData.slice().sort((a, b) => a.Price - b.Price);
        }
        else if (dropvalue === 'Price-High to Low') {
            return jsonData.slice().sort((a, b) => b.Price - a.Price);
        }
        else {
            // Default Order or other cases
            return jsonData;
        }
    };

    const displayedItems = sortJsonData()
        .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
        .map((item) => {
           
            return (
                <div className="col-md-3 mb-12">

                    <div className="card" id="main-div-card">
                        <img onClick={Singleproperty} id={item.PropertyID} className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrO9L064TtmrRBRYlx5lh0nXfR5m8EsA7VNw&usqp=CAU" alt="Card cap" style={{ height: '210px' }} />

                        <div className="card-body" style={{ padding: '27px 27px 0px 27px' }}>


                            <h5 className="card-title Cardtitle">High Floor | Stunning Views | Hamdover Soon</h5>

                            <p className="card-text details" style={{ marginTop: '-5px' }}>
                                Dubai Marina, Apartment
                            </p>

                            <div className="additional-details mt-4" style={{ marginBottom: '30px' }}>

                                <div className="bed details mt-2">
                                    <img alt="featured" src="/images/bed.JPG" className="mr-2 -mt-1" />{item.No_of_Rooms}
                                    <span id="spacing">|</span>
                                </div>

                                <div className="bathtub details mt-2">
                                    <img alt="featured" src="/images/bathtub.JPG" className="mr-2 -mt-1" />{item.No_of_Bathroom}
                                    <span id="spacing">|</span>
                                </div>

                                <div className="squre-ft details mt-2">
                                    <img alt="featured" src="/images/square.JPG" className="mr-1" />
                                    {item.Unit_Builtup_Area} <span className="text-lowercase">{item.unit_measure}</span>
                                </div>
                            </div>

                            <p className="price-details">AED <strong>{formatNumberWithCommas(item.Price)}</strong></p>

                        </div>
                    </div>
                </div>
            )
        });

    const handleDropdownSelect = (e) => {
        const id = e.target.value
        setDropvalue(id);
    };

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <div className="mt-0 p-12" id="salemaindiv">
            <h3 id="pro-heading">Commercial Properties in Dubai</h3>
            {/* <h3 id="pro-heading">OffPlan Properties in Dubai ({datalength})</h3> */}


            {loading === true ? (
                <div className="text-center">Loading.....</div>
            ) : jsonData.length >= 1 ? (
                <>

                    <div className="row mb-10" id="drop-pagination">
                        <div className="result-info mt-2 col">
                            Showing {currentPage * ITEMS_PER_PAGE + 1} -{" "}
                            {Math.min((currentPage + 1) * ITEMS_PER_PAGE, jsonData.length)}{" "}
                            of {" "} {jsonData.length} result
                        </div>

                        <div className="" id="drop-down-filter" style={{ height: '35px', textAlign: 'center', margin: 'auto', display: 'inline-flex', marginRight: '2px', width: '300px', float: 'right' }}>
                            <h5 style={{ marginRight: '5px', margin: 'auto', fontWeight: '600' }}> Sort By:</h5>
                            <select id="filterselectbox" className="" title="Just Listed/Updated" onClick={handleDropdownSelect}>
                                <option id="Default Order">Just Listed/Updated</option>
                                <option id="Price-Low to High">Price-Low to high</option>
                                <option id="Price-High to Low">Price-High to Low</option>
                                <option id="Featured Listings">Featured Listings</option>
                            </select>
                        </div>

                    </div>
                    <div className="">
                        <div
                            className="row pl-16"
                            style={{ width: "100%", marginLeft: "0px" }}
                        >
                            {displayedItems}
                        </div>
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
    );
};


export default Commercial
