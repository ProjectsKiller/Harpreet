import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from 'axios';
export default function WhyUs() {
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


  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [icon4, setIcon4] = useState(null);
  const [icon5, setIcon5] = useState(null);
  const [icon6, setIcon6] = useState(null);
  const [icon7, setIcon7] = useState(null);

  const [IconChange1, setIconChange1] = useState('');
  const [IconChange2, setIconChange2] = useState('');
  const [IconChange3, setIconChange3] = useState('');
  const [IconChange4, setIconChange4] = useState('');
  const [IconChange5, setIconChange5] = useState('');
  const [IconChange6, setIconChange6] = useState('');
  const [IconChange7, setIconChange7] = useState('');

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }

  function handleIcon1(e) {
    if (e.target.files[0]) {
      setIcon1(e.target.files[0]);
      setIconChange1(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon1(null);
      setIconChange1('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon2(e) {
    if (e.target.files[0]) {
      setIcon2(e.target.files[0]);
      setIconChange2(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon2(null);
      setIconChange2('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon3(e) {
    if (e.target.files[0]) {
      setIcon3(e.target.files[0]);
      setIconChange3(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon3(null);
      setIconChange3('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon4(e) {
    if (e.target.files[0]) {
      setIcon4(e.target.files[0]);
      setIconChange4(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon4(null);
      setIconChange4('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon5(e) {
    if (e.target.files[0]) {
      setIcon5(e.target.files[0]);
      setIconChange5(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon5(null);
      setIconChange5('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon6(e) {
    if (e.target.files[0]) {
      setIcon6(e.target.files[0]);
      setIconChange6(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon6(null);
      setIconChange6('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }

  function handleIcon7(e) {
    if (e.target.files[0]) {
      setIcon7(e.target.files[0]);
      setIconChange7(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon7(null);
      setIconChange7('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }



  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',

    sec2heading: '',
    sec2icon: '',
    sec2iconheading: '',
    sec2icondiscription: '',

    sec2icon2: '',
    sec2iconheading2: '',
    sec2icondiscription2: '',

    sec2icon3: '',
    sec2iconheading3: '',
    sec2icondiscription3: '',

    sec2icon4: '',
    sec2iconheading4: '',
    sec2icondiscription4: '',

    sec2icon5: '',
    sec2iconheading5: '',
    sec2icondiscription5: '',

    sec2icon6: '',
    sec2iconheading6: '',
    sec2icondiscription6: '',

    sec2icon7: '',
    sec2iconheading7: '',
    sec2icondiscription7: '',


    // ... other properties
  });

  console.log(icon1, "icon1");
  useEffect(() => {
    const tablename = "whyuspagedb"
         const whydb = {"tablename" : "whyuspagedb"}
          axios.post(`/staticdata` , whydb).then((res) => {
      setbg1(res.data[0].sec1bgimage)
      setIcon1(res.data[0].sec2icon)
      setIcon2(res.data[0].sec2icon2)
      setIcon3(res.data[0].sec2icon3)
      setIcon4(res.data[0].sec2icon4)
      setIcon5(res.data[0].sec2icon5)
      setIcon6(res.data[0].sec2icon6)
      setIcon7(res.data[0].sec2icon7)




      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2heading: res.data[0].sec2heading,

        sec2icon: res.data[0].sec2icon,
        sec2iconheading: res.data[0].sec2iconheading,
        sec2icondiscription: res.data[0].sec2icondiscription,

        sec2icon2: res.data[0].sec2icon2,
        sec2iconheading2: res.data[0].sec2iconheading2,
        sec2icondiscription2: res.data[0].sec2icondiscription2,

        sec2icon3: res.data[0].sec2icon3,
        sec2iconheading3: res.data[0].sec2iconheading3,
        sec2icondiscription3: res.data[0].sec2icondiscription3,

        sec2icon4: res.data[0].sec2icon4,
        sec2iconheading4: res.data[0].sec2iconheading4,
        sec2icondiscription4: res.data[0].sec2icondiscription4,

        sec2icon5: res.data[0].sec2icon5,
        sec2iconheading5: res.data[0].sec2iconheading5,
        sec2icondiscription5: res.data[0].sec2icondiscription5,

        sec2icon6: res.data[0].sec2icon6,
        sec2iconheading6: res.data[0].sec2iconheading6,
        sec2icondiscription6: res.data[0].sec2icondiscription6,

        sec2icon7: res.data[0].sec2icon7,
        sec2iconheading7: res.data[0].sec2iconheading7,
        sec2icondiscription7: res.data[0].sec2icondiscription7,

      });
    })
  }, []);



  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription,
      "sec2heading": data.sec2heading, "sec2iconheading": data.sec2iconheading,
      "sec2icondiscription": data.sec2icondiscription,
      " sec2iconheading2": data.sec2iconheading2,

      " sec2icondiscription2": data.sec2icondiscription2,
      " sec2iconheading3": data.sec2iconheading3,
      " sec2icondiscription3": data.sec2icondiscription3,

      " sec2iconheading4": data.sec2iconheading4,
      " sec2icondiscription4": data.sec2icondiscription4,

      " sec2iconheading5": data.sec2iconheading5,
      " sec2icondiscription5": data.sec2icondiscription5,

      " sec2iconheading6": data.sec2iconheading6,
      " sec2icondiscription6": data.sec2icondiscription6,
      " sec2iconheading7": data.sec2iconheading7,
      " sec2icondiscription7": data.sec2icondiscription7,



      "bg1": bg1, "icon1": icon1, "icon2": icon2, "icon3": icon3, "icon4": icon4, "icon5": icon5, "icon6": icon6, "icon7": icon7,
    }



    console.log(mydata, "mydataaa");
    const formData = new FormData();

    // Append text data

    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2heading', data.sec2heading);


    formData.append('sec2iconheading', data.sec2iconheading);
    formData.append('sec2icondiscription', data.sec2icondiscription);
    formData.append('sec2iconheading2', data.sec2iconheading2);
    formData.append('sec2icondiscription2', data.sec2icondiscription2);

    formData.append('sec2iconheading3', data.sec2iconheading3);
    formData.append('sec2icondiscription3', data.sec2icondiscription3);
    formData.append('sec2iconheading4', data.sec2iconheading4);
    formData.append('sec2icondiscription4', data.sec2icondiscription4);
    formData.append('sec2iconheading5', data.sec2iconheading5);
    formData.append('sec2icondiscription5', data.sec2icondiscription5);
    formData.append('sec2iconheading6', data.sec2iconheading6);
    formData.append('sec2icondiscription6', data.sec2icondiscription6);
    formData.append('sec2iconheading7', data.sec2iconheading7);
    formData.append('sec2icondiscription7', data.sec2icondiscription7);





    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }

    appendImageIfDefined('bg1', bg1);
    appendImageIfDefined('icon1', icon1);
    appendImageIfDefined('icon2', icon2);
    appendImageIfDefined('icon3', icon3);
    appendImageIfDefined('icon4', icon4);
    appendImageIfDefined('icon5', icon5);
    appendImageIfDefined('icon6', icon6);
    appendImageIfDefined('icon7', icon7);




    console.log(mydata, "data");
    axios.post(`/updatewhyus`, formData).then((res) => {
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
                <h2>Why Us
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">Why Us</li>

                </ul>

              </div>
            </div>
          </div>
          <div className="row clearfix box_my">
            <div className="col-lg-12">

              {/* ##################section 1 #####################  */}


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


              {/* ##################section 2 #####################  */}

              <div className="card">
                <div className="header">
                  <h2><strong>Section 2</strong> "What we Offer" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <h5><strong>Box 1</strong> "Information" </h5>

                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Main Heading</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2heading} onChange={(e) => setData({ ...data, sec2heading: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon1} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >

                        {IconChange1 ? (
                          <img src={IconChange1} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon1}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading} onChange={(e) => setData({ ...data, sec2iconheading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix space-cont">
                    <h5><strong>Box 2</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon2} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >
                        {IconChange2 ? (
                          <img src={IconChange2} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon2}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading2} onChange={(e) => setData({ ...data, sec2iconheading2: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription2} onChange={(e) => setData({ ...data, sec2icondiscription2: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>



                  {/* sec3  */}

                  <div className="row clearfix space-cont">
                    <h5><strong>Box 3</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon3} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >

                        {IconChange3 ? (
                          <img src={IconChange3} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon3}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading3} onChange={(e) => setData({ ...data, sec2iconheading3: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription3} onChange={(e) => setData({ ...data, sec2icondiscription3: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>



                  <div className="row clearfix space-cont">
                    <h5><strong>Box 4</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon4} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >

                        {IconChange4 ? (
                          <img src={IconChange4} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon4}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading4} onChange={(e) => setData({ ...data, sec2iconheading4: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription4} onChange={(e) => setData({ ...data, sec2icondiscription4: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>



                  <div className="row clearfix space-cont">
                    <h5><strong>Box 5</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon5} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >

                        {IconChange5 ? (
                          <img src={IconChange5} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon5}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading5} onChange={(e) => setData({ ...data, sec2iconheading5: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription5} onChange={(e) => setData({ ...data, sec2icondiscription5: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix space-cont">
                    <h5><strong>Box 6</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon6} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >

                        {IconChange6 ? (
                          <img src={IconChange6} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon6}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading6} onChange={(e) => setData({ ...data, sec2iconheading6: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription6} onChange={(e) => setData({ ...data, sec2icondiscription6: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix space-cont">
                    <h5><strong>Box 7</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Side Image</label>
                        <input type="file" className="form-control" onChange={handleIcon7} />
                      </div>
                    </div>

                    <div className="form_my logo-group col-sm-2">
                      <div className="logo-img"   >


                        {IconChange7 ? (
                          <img src={IconChange7} alt="Updated Icon" />
                        ) : (
                          <img src={`/uploads/${icon7}`} alt="Default Icon" />
                        )}

                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label for="title" className="form-label">Icon Heading</label>
                        <input type="text" className="form-control" value={data.sec2iconheading7} onChange={(e) => setData({ ...data, sec2iconheading7: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label for="w3review" className="form-label">Icon Description</label></p>
                        <textarea id="Icon Description" name="w3review" rows="2" cols="200" value={data.sec2icondiscription7} onChange={(e) => setData({ ...data, sec2icondiscription7: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>


                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="col-sm-12 submit-opt">
          <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}> Update</button>
        </div>
      </main>
      {/* <!-- End #main --> */}
    </>
  );
}

