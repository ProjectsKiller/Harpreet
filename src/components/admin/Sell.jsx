import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
export default function Sell() {
  const [chgwid, setChgwid] = useState({ "margin": "66px 0px 15px 250px" })
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


  const [bg1, setbg1] = useState(null);
  const [bg2, setbg2] = useState(null);


  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');



  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  function handleChange1(e) {
    setbg2(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
  }


  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2heading: '',
    sec2button: '',
    sec3heading: '',
    sec3discription: '',
    sec3image: '',


    // ... other properties
  });

  useEffect(() => {
    const tablename = "sellpagedb"
     const tablen = {"tablename" : "sellpagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)
      setbg2(res.data[0].sec3image)

      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,
        sec2button: res.data[0].sec2button,


        sec3heading: res.data[0].sec3heading,
        sec3discription: res.data[0].sec3discription,
        sec3image: res.data[0].sec3image,

      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2heading": data.sec2heading, "sec2button": data.sec2button,
      "sec3heading": data.sec3heading, " sec3discription": data.sec3discription, "bg1": bg1, "bg2": bg2
    }



    console.log(mydata, "mydataaa");
    const formData = new FormData();

    // Append text data

    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2heading', data.sec2heading);


    formData.append('sec2button', data.sec2button);
    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3discription', data.sec3discription);





    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }

    appendImageIfDefined('bg1', bg1);
    appendImageIfDefined('bg2', bg2);




    console.log(mydata, "data");
    axios.post(`/updatesell`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }

  return (
    <>
      <main id="whole" style={chgwid}>


        {/* <!-- box --> */}

        <div className="container-fluid" id="part">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Sell
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Sell</li>

                </ul>

              </div>
            </div>
          </div>
          <div className="row clearfix box_my">
            <div className="col-lg-12">


              <div className="card">
                <div className="header">
                  <h2><strong>Section 1</strong> "Background Image" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data" style={{ backgroundImage: `url('${file ? `${file}` : `/uploads/${bg1}`}')` }}>
                        <div className="dz-message drag-icon-cph">
                          <i className="bi bi-hand-index-thumb"></i>
                          <div className=""><input type="file" onChange={handleChange} /></div>
                          <h3>Drop files here or click to upload.</h3>
                        </div>

                      </form>
                    </div>
                    <div className="row ban-top">
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Banner Heading</label>
                          <input type="text" className="form-control" value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Banner Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec1discription} onChange={(e) => setData({ ...data, sec1discription: e.target.value })}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="header">
                  <h2><strong>Section 2</strong> "Sell Information"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec2heading} onChange={(e) => setData({ ...data, sec2heading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Button</label>
                        <input type="text" className="form-control" value={data.sec2button} onChange={(e) => setData({ ...data, sec2button: e.target.value })} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Why list"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label"> Heading</label>
                          <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="158" value={data.sec3discription} onChange={(e) => setData({ ...data, sec3discription: e.target.value })}></textarea>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form_my">
                          <label for="title" className="form-label">Side Image</label>
                          <input type="file" className="form-control" onChange={handleChange1} />
                        </div>
                      </div>
                      <div className="form_my logo-group col-sm-2">
                        <div className="logo-img"   >


                          {file1 ? (
                            <img src={file1} alt="Updated Icon" />
                          ) : (
                            <img src={`/uploads/${bg2}`} alt="Default Icon" />
                          )}

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <div className="col-sm-12 submit-opt">
            <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
          </div>
        </div>
      </main>
      {/* <!-- End #main --> */}
    </>
  );
}