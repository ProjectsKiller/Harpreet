import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import axios from "axios";
export default function OurTeam() {
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


  const [file, setFile] = useState('');

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2heading: '',
  });

  useEffect(() => {
    const tablename = 'ourteampagedb'
      const tablen = {"tablename" : "ourteampagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1( res.data[0].sec1bgimage)
      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,
      });
    })
  }, []);

  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2heading": data.sec2heading, "bg1": bg1
    }



    const formData = new FormData();

    // Append text data
    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2heading', data.sec2heading);


    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }

    appendImageIfDefined('bg1', bg1);

    axios.post(`/ourteamupdate`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }

    })
  }


  return (
    <>
      <main id="whole" style={chgwid}>
        {/* <!-- box --> */}

        <div className="container-fluid">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Our Team
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Our Team</li>

                </ul>

              </div>
            </div>
          </div>

        </div>

        <div className="container">
          <div className="row box_my">
            <div className="col-md-12">
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
                      <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data"  style={{ backgroundImage: `url('${file ? `${file}` : `/uploads/${bg1}`}')` }}>
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
                          <input type="text" className="form-control" value={data.sec1heading}
                            onChange={(e) => setData({ ...data, sec1heading: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label for="w3review" className="form-label">Banner Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec1discription}
                            onChange={(e) => setData({ ...data, sec1discription: e.target.value })}></textarea>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Heading</label>
                          <input type="text" className="form-control" value={data.sec2heading}
                            onChange={(e) => setData({ ...data, sec2heading: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
          <div className="col-sm-12 sub-opt submit-opt">
            <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
          </div>
        </div>


      </main>
      {/* <!-- End #main --> */}
    </>)
}

