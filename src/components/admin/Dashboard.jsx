import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [buyproperties, setBuyproperties] = useState("");
  const [rentproperties, setrentproperties] = useState("");
  const [totalproperty, settotalproperty] = useState([]);
  const [form1, setForm1] = useState("");
  const [form2, setForm2] = useState("");
  const [totalinquery, settotalinquery] = useState(0);
  const [commoninquery, setcommoninquery] = useState(0);
  const [formsub, setformsub] = useState(0);
  const [traffic, settraffic] = useState(0);

  const fetchTotalProperty = async () => {
    const tablename1 = { tablename: "basicpropertiesDetails" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        settotalproperty(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchRentProperties = async () => {
    await axios
      .get(`http://localhost:4000/allprorent`)
      .then((response) => {
        setrentproperties(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchBuyProperties = async () => {
    await axios
      .get(`http://localhost:4000/allprosale`)
      .then((response) => {
        setBuyproperties(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchForm1 = async () => {
    const tablename1 = { tablename: "userinfo" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        setForm1(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchForm2 = async () => {
    const tablename1 = { tablename: "internalform" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        setForm2(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchCommonInquery = async () => {
    const tablename1 = { tablename: "commondb" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        setcommoninquery(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchFormSub = async () => {
    const tablename1 = { tablename: "form_submissions" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        setformsub(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  const fetchTraffic = async () => {
    const tablename1 = { tablename: "traffic" };
    await axios
      .post(`http://localhost:4000/staticdata`, tablename1)
      .then((response) => {
        settraffic(response.data.length);
      })
      .catch((error) =>
        console.error("Error fetching navigation items:", error)
      );
  };

  async function one() {
    await fetchTotalProperty();
    await fetchRentProperties();
    await fetchBuyProperties();
    await fetchForm1();
    await fetchForm2();
    await fetchCommonInquery();
    await fetchFormSub();
    await fetchTraffic();
    console.log(formsub);
    console.log(commoninquery);

  }

  useEffect(() => {
    setInterval(() => {
      const total = parseInt(formsub) + parseInt(commoninquery);
      console.log(total);
       settotalinquery(total);
    }, 9000);
   
    one();
  }, []);

  return (
    <>
      <main id="whole" className="p-0 m-auto" style={{ width: "100%" }}>
        <div className="container-fluid">
          <h2 className="all-main-heading text-center my-6">
            Dashboard <span>(Under Work)</span>{" "}
          </h2>

          <div className="row clearfix box_my">
            <div className="col-12 col-sm-6 ">
              <div className="card">
                <div className="body">
                  <h3
                    className="all-main-heading text-left mb-2"
                    style={{ fontSize: "35px", textAlign: "left" }}
                  >
                    {traffic}
                  </h3>
                  <h1
                    className="all-para"
                    style={{
                      fontSize: "20px",
                      textAlign: "left",
                      color: "#212529",
                    }}
                  >
                    Visits
                  </h1>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="758"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {totalproperty}
                  </h3>
                  <p className="text-muted">Total Properties</p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="128"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {form1}
                  </h3>
                  <p className="text-muted">Home Page Enquiries</p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="758"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {totalinquery}
                  </h3>
                  <p className="text-muted">Other Enquiries </p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="128"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {buyproperties}
                  </h3>
                  <p className="text-muted">Buy Property</p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="2521"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {rentproperties}
                  </h3>
                  <p className="text-muted">Rent Properties</p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="body">
                  <h3
                    className="number count-to"
                    data-from="0"
                    data-to="24500"
                    data-speed="2000"
                    data-fresh-interval="700"
                  >
                    {buyproperties}
                  </h3>
                  <p className="text-muted">Residential Properties</p>

                  {/* <div className="col-sm-12 view-opt">
                    <button type="submit" className="btn col-sub btn-round">View More</button>
                  </div> */}
                </div>
              </div>
            </div>

            {/*
   
            <div className="col-lg-3 col-md-6">
              <div className="card">
                <div className="body">
                  <h3 className="number count-to" data-from="0" data-to="24500" data-speed="2000" data-fresh-interval="700" >24500</h3>
                  <p className="text-muted">Mortgage Services Enquiries</p>

                  // <div className="col-sm-12 view-opt">
                  //   <button type="submit" className="btn col-sub btn-round">View More</button>
                  // </div>
                  
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      {/* <!-- End #main --> */}
    </>
  );
}
