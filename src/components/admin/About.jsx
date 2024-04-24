import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import axios from 'axios'
import "../../styles/admin/Style.css"

export default function About() {
  const [chgwid, setChgwid] = useState({ "margin": "66px 0px 15px 250px" })
  const userVal = useContext(UserContext)
  const [Myimage, SetMyimage] = useState("/img/Logo.jpg")

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

  // let Chooseimg = document.getElementById("ChooseImg")

  function SelectedImg() {
    let Chooseimg = document.getElementById("ChooseImg").value
    console.log(Chooseimg)
    SetMyimage("file:///" + Chooseimg)
  }

  const [bg1, setbg1] = useState(null);
  const [bg2, setbg2] = useState(null);


  const [file, setFile] = useState('');
  const [file1, setFile1] = useState('');


  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [icon3, setIcon3] = useState(null);
  const [icon4, setIcon4] = useState(null);
  const [icon5, setIcon5] = useState(null);
  const [icon6, setIcon6] = useState(null);
  const [icon7, setIcon7] = useState(null);
  const [icon8, setIcon8] = useState(null);
  const [icon9, setIcon9] = useState(null);



  const [IconChange1, setIconChange1] = useState('');
  const [IconChange2, setIconChange2] = useState('');
  const [IconChange3, setIconChange3] = useState('');
  const [IconChange4, setIconChange4] = useState('');
  const [IconChange5, setIconChange5] = useState('');
  const [IconChange6, setIconChange6] = useState('');
  const [IconChange7, setIconChange7] = useState('');
  const [IconChange8, setIconChange8] = useState('');
  const [IconChange9, setIconChange9] = useState('');



  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }
  function handleChange1(e) {
    setbg2(e.target.files[0]);
    setFile1(URL.createObjectURL(e.target.files[0]));
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
  function handleIcon8(e) {
    if (e.target.files[0]) {
      setIcon8(e.target.files[0]);
      setIconChange8(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon8(null);
      setIconChange8('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }
  function handleIcon9(e) {
    if (e.target.files[0]) {
      setIcon9(e.target.files[0]);
      setIconChange9(URL.createObjectURL(e.target.files[0]));
    } else {
      setIcon9(null);
      setIconChange9('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU');
    }
  }


  const [data, setData] = useState({
    sec1bgimage: '',
    sec1heading: '',
    sec1discription: '',
    sec2discription: '',
    sec2btn: '',
    sec3heading: '',
    sec3subheading1: '',
    sec3discription1: '',
    sec3subheading2: '',

    sec3discription2: '',
    sec3image: '',
    sec4number1: '',
    sec4heading1: '',
    sec4discription1: '',


    sec4number2: '',
    sec4heading2: '',
    sec4discription2: '',
    sec4number3: '',


    sec4heading3: '',
    sec4discription3: '',
    sec5heading: '',

    sec5icon: '',
    sec5discription: '',
    sec6heading: '',


    sec6discription: '',
    sec6chackboxtext1: '',
    sec6chackboxtext2: '',
    sec6button: '',
    sec5icon2: '',

    sec5discription2: '',
    sec5icon3: '',
    sec5discription3: '',
    sec5icon4: '',
    sec5discription4: '',
    sec5icon5: '',
    sec5discription5: '',

    sec5icon6: '',
    sec5discription6: '',
    sec5icon7: '',

    sec5discription7: '',
    sec5icon8: '',
    sec5discription8: '',
    sec6heading: '',
    sec5discription9: '',

    // ... other properties
  });

  console.log(icon1, "iocn1");

  useEffect(() => {
    const tablename = "aboutuspagedb"
    const tablen = {"tablename" : "aboutuspagedb"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setbg1(res.data[0].sec1bgimage)


      setbg2(res.data[0].sec3image)




      setIcon1(res.data[0].sec5icon);
      setIcon2(res.data[0].sec5icon2);
      setIcon3(res.data[0].sec5icon3);
      setIcon4(res.data[0].sec5icon4);
      setIcon5(res.data[0].sec5icon5);
      setIcon6(res.data[0].sec5icon6);
      setIcon7(res.data[0].sec5icon7);
      setIcon8(res.data[0].sec5icon8);
      setIcon9(res.data[0].sec5icon9);





      setData({
        sec1bgimage: res.data[0].sec1bgimage,
        sec1heading: res.data[0].sec1heading,
        sec1discription: res.data[0].sec1discription,
        sec2discription: res.data[0].sec2discription,
        sec2btn: res.data[0].sec2btn,


        sec3heading: res.data[0].sec3heading,
        sec3subheading1: res.data[0].sec3subheading1,

        sec3discription1: res.data[0].sec3discription1,
        sec3subheading2: res.data[0].sec3subheading2,
        sec3discription2: res.data[0].sec3discription2,
        sec3image: res.data[0].sec3image,
        sec4number1: res.data[0].sec4number1,

        sec4heading1: res.data[0].sec4heading1,
        sec4discription1: res.data[0].sec4discription1,
        sec4number2: res.data[0].sec4number2,
        sec4heading2: res.data[0].sec4heading2,

        sec4discription2: res.data[0].sec4discription2,
        sec4number3: res.data[0].sec4number3,


        sec4heading3: res.data[0].sec4heading3,
        sec4discription3: res.data[0].sec4discription3,
        sec5heading: res.data[0].sec5heading,

        sec5icon: res.data[0].sec5icon,
        sec5discription: res.data[0].sec5discription,
        sec6heading: res.data[0].sec6heading,

        sec6discription: res.data[0].sec6discription,
        sec6chackboxtext1: res.data[0].sec6chackboxtext1,
        sec6chackboxtext2: res.data[0].sec6chackboxtext2,

        sec6button: res.data[0].sec6button,
        sec5icon2: res.data[0].sec5icon2,

        sec5discription2: res.data[0].sec5discription2,
        sec5icon3: res.data[0].sec5icon3,
        sec5discription3: res.data[0].sec5discription3,
        sec5icon4: res.data[0].sec5icon4,
        sec5discription4: res.data[0].sec5discription4,
        sec5icon5: res.data[0].sec5icon5,
        sec5discription5: res.data[0].sec5discription5,

        sec5icon6: res.data[0].sec5icon6,
        sec5discription6: res.data[0].sec5discription6,
        sec5icon7: res.data[0].sec5icon7,

        sec5discription7: res.data[0].sec5discription7,

        sec5icon8: res.data[0].sec5icon8,
        sec5discription8: res.data[0].sec5discription8,
        sec5icon9: res.data[0].sec5icon9,
        sec5discription9: res.data[0].sec5discription9,

      });
    })
  }, []);


  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'sec1heading': data.sec1heading, 'sec1discription': data.sec1discription, 'sec2discription': data.sec2discription,
      "sec2btn": data.sec2btn, "sec3heading": data.sec3heading,

      "sec3subheading1": data.sec3subheading1, "sec3discription1": data.sec3discription1, " sec3subheading2"
        : data.sec3subheading2,
      "sec3discription2": data.sec3discription2,
      "sec4number1": data.sec4number1, "sec4heading1": data.sec4heading1, "sec4discription1": data.sec4discription1,

      "sec4number2": data.sec4number2, "sec4heading2": data.sec4heading2, "sec4discription2": data.sec4discription2,

      "sec4number3": data.sec4number3, "sec4heading3": data.sec4heading3,

      "sec4discription3": data.sec4discription3, "sec5heading"
        : data.sec5heading, "sec5discription": data.sec5discription,

      "sec6heading": data.sec6heading, "sec6discription": data.sec6discription, "sec6chackboxtext1": data.sec6chackboxtext1, "sec6chackboxtext2": data.sec6chackboxtext2, "sec6button": data.sec6button,

      "sec5discription2"
        : data.sec5discription2,

      "sec5discription3": data.sec5discription3, "sec5discription4": data.sec5discription4, "sec5discription5": data.sec5discription5,
      "sec5discription6": data.sec5discription6, "sec5discription7": data.sec5discription7,
      "sec5discription8": data.sec5discription8, "sec5discription9": data.sec5discription9,


      "bg1": bg1, "bg2": bg2, "icon1": icon1, "icon2": icon2, "icon3": icon3, "icon4": icon4, "icon5": icon5, "icon6": icon6, "icon7": icon7, "icon8": icon8, "icon9": icon9
    }
    console.log(mydata, "mydataaa");
    const formData = new FormData();

    // Append text data
    formData.append('sec1heading', data.sec1heading);
    formData.append('sec1discription', data.sec1discription);
    formData.append('sec2discription', data.sec2discription);
    formData.append('sec2btn', data.sec2btn);


    formData.append('sec3heading', data.sec3heading);
    formData.append('sec3subheading1', data.sec3subheading1);
    formData.append('sec3discription1', data.sec3discription1);

    formData.append('sec3subheading2', data.sec3subheading2);
    formData.append('sec3discription2', data.sec3discription2);
    formData.append('sec4number1', data.sec4number1);


    formData.append('sec4heading1', data.sec4heading1);
    formData.append('sec4discription1', data.sec4discription1);
    formData.append('sec4number2', data.sec4number2);


    formData.append('sec4heading2', data.sec4heading2);
    formData.append('sec4discription2',
      data.sec4discription2);

    formData.append('sec4number3', data.sec4number3);
    formData.append('sec4heading3', data.sec4heading3);

    formData.append('sec4discription3', data.sec4discription3);
    formData.append('sec5heading', data.sec5heading);

    formData.append('sec5discription', data.sec5discription);
    formData.append('sec6heading', data.sec6heading);
    formData.append('sec6discription', data.sec6discription);
    formData.append('sec6chackboxtext1', data.sec6chackboxtext1);

    formData.append('sec6chackboxtext2', data.sec6chackboxtext2);
    formData.append('sec6button', data.sec6button);


    formData.append('sec5discription2', data.sec5discription2);
    formData.append('sec5discription3', data.sec5discription3);

    formData.append('sec5discription4', data.sec5discription4);
    formData.append('sec5discription5', data.sec5discription5);
    formData.append('sec5discription6', data.sec5discription6);
    formData.append('sec5discription7', data.sec5discription7);
    formData.append('sec5discription8', data.sec5discription8);

    formData.append('sec5discription9', data.sec5discription9);




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

    appendImageIfDefined('icon1', icon1);
    appendImageIfDefined('icon2', icon2);
    appendImageIfDefined('icon3', icon3);
    appendImageIfDefined('icon4', icon4);
    appendImageIfDefined('icon5', icon5);
    appendImageIfDefined('icon6', icon6);
    appendImageIfDefined('icon7', icon7);
    appendImageIfDefined('icon8', icon8);
    appendImageIfDefined('icon9', icon9);


    console.log(mydata, "data");
    axios.post(`/updateabout`, formData).then((res) => {
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
                <h2>About Us
                  <small className="text-muted">Welcome to Page</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-end">

                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"><a href="index.html"><i className="bx bx-home"></i> Page</a></li>
                  <li className="breadcrumb-item active">About Us</li>

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
                          <input type="text" className="form-control" value={data.sec1heading} onChange={(e) => setData({ ...data, sec1heading: e.target.value })}
                          />
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
                  <h2><strong>Section 2</strong> "About Us"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">

                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">About Description</label></p>
                        <textarea id="Banner Description" name="w3review" rows="12" cols="200" value={data.sec2discription} onChange={(e) => setData({ ...data, sec2discription: e.target.value })}></textarea>
                      </div>
                    </div>
                    {/* <div  className="col-sm-12">
              <div  className="form_my">
                <label for="title"  className="form-label">Button Text</label>
                  <input type="text"  className="form-control" value={data.sec2btn}  onChange={(e) => setData({ ...data, sec2btn: e.target.value })}/>
              </div>
          </div> */}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Our Vision"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix">
                    <div className="row">


                      <div className="col-sm-12">
                        <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data" style={{ backgroundImage: `url('${file1 ? `${file1}` : `/uploads/${bg2}`}')` }}>
                          <div className="dz-message drag-icon-cph">
                            <i className="bi bi-hand-index-thumb"></i>
                            <div className=""><input type="file" onChange={handleChange1} /></div>
                            <h3>Drop files here or click to upload.</h3>
                          </div>

                        </form>
                      </div>

                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Main Heading</label>
                          <input type="text" className="form-control" value={data.sec3heading} onChange={(e) => setData({ ...data, sec3heading: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix space-cont">
                      <h5><strong>Box 1</strong> "Information" </h5>

                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Sub Heading</label>
                          <input type="text" className="form-control" value={data.sec3subheading1} onChange={(e) => setData({ ...data, sec3subheading1: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label htmlFor="w3review" className="form-label">Sub Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec3discription1} onChange={(e) => setData({ ...data, sec3discription1: e.target.value })}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix space-cont">
                      <h5><strong>Box 2</strong> "Information" </h5>

                      <div className="col-sm-12">
                        <div className="form_my">
                          <label for="title" className="form-label">Sub Heading</label>
                          <input type="text" className="form-control" value={data.sec3subheading2} onChange={(e) => setData({ ...data, sec3subheading2: e.target.value })} />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form_my">
                          <p className="size-cnt"><label htmlFor="w3review" className="form-label">Sub Description</label></p>
                          <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec3discription2} onChange={(e) => setData({ ...data, sec3discription2: e.target.value })}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 4</strong> "Detail"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row clearfix space-cont">
                    <h5><strong>Box 1</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Number</label>
                        <input type="text" className="form-control" value={data.sec4number1} onChange={(e) => setData({ ...data, sec4number1: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading1} onChange={(e) => setData({ ...data, sec4heading1: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Main Description</label></p>
                        <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec4discription1} onChange={(e) => setData({ ...data, sec4discription1: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix space-cont">
                    <h5><strong>Box 2</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Number</label>
                        <input type="text" className="form-control" value={data.sec4number2} onChange={(e) => setData({ ...data, sec4number2: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading2} onChange={(e) => setData({ ...data, sec4heading2: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Main Description</label></p>
                        <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec4discription2} onChange={(e) => setData({ ...data, sec4discription2: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="row clearfix space-cont">
                    <h5><strong>Box 3</strong> "Information" </h5>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Number</label>
                        <input type="text" className="form-control" value={data.sec4number3} onChange={(e) => setData({ ...data, sec4number3: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <label for="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec4heading3} onChange={(e) => setData({ ...data, sec4heading3: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Main Description</label></p>
                        <textarea id="Banner Description" name="w3review" rows="2" cols="200" value={data.sec4discription3} onChange={(e) => setData({ ...data, sec4discription3: e.target.value })}></textarea>
                      </div>
                    </div>
                  </div>

                </div>
              </div>



              <div className="card">
                <div className="header">
                  <h2><strong>Section 5</strong> "Our Services"</h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="col-sm-12">
                    <div className="form_my">
                      <label for="title" className="form-label">Main Heading</label>
                      <input type="text" className="form-control" value={data.sec5heading} onChange={(e) => setData({ ...data, sec5heading: e.target.value })} />
                    </div>
                  </div>
                  <div className="row clearfix space-cont">
                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 1</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >


                            {IconChange1 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange1} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon1}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon1} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription} onChange={(e) => setData({ ...data, sec5discription: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 2</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange2 ? (
                              <img src={IconChange2} alt="Updated Icon" />
                            ) : (
                              <img src={`/uploads/${icon2}`} alt="Default Icon" />
                            )}

                            <input type="file" onChange={handleIcon2} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription2} onChange={(e) => setData({ ...data, sec5discription2: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 3</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange3 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange3} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon3}`} alt="Default Icon" />
                            )}


                            <input type="file" onChange={handleIcon3} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription3} onChange={(e) => setData({ ...data, sec5discription3: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 4</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange4 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange4} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon4}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon4} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription4} onChange={(e) => setData({ ...data, sec5discription4: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 5</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange5 ? (

                              <img src={IconChange5} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon5}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon5} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription5} onChange={(e) => setData({ ...data, sec5discription5: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 6</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange6 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange6} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon6}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon6} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription6} onChange={(e) => setData({ ...data, sec5discription6: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 7</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange7 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange7} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon7}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon7} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription7} onChange={(e) => setData({ ...data, sec5discription7: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 8</strong> "Information" </h5>
                      <div className="row">
                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >

                            {IconChange8 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange8} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon8}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon8} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription8} onChange={(e) => setData({ ...data, sec5discription8: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <h5 className="ban-top"><strong>Box 9</strong> "Information" </h5>
                      <div className="row">
                        {/* <div  className="col-sm-2">
        <div  className="form_my">
          <label for="title"  className="form-label">Icon Image</label>
            <input type="file" name="file" className="form-control"/>
        </div>
    </div> */}

                        <div className="form_my logo-group col-sm-2">
                          <div className="logo-img"   >
                            {IconChange9 ? (
                              // If IconChange1 is not null or undefined (changed), display the updated image
                              <img src={IconChange9} alt="Updated Icon" />
                            ) : (
                              // If IconChange1 is null or undefined (not changed), display the image from /uploads/
                              <img src={`/uploads/${icon9}`} alt="Default Icon" />
                            )}
                            <input type="file" onChange={handleIcon9} />
                            {/* <button id="hid1" className="hid" onClick={hidebtn}> Upload</button> */}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title</label>
                            <input type="text" className="form-control" value={data.sec5discription9} onChange={(e) => setData({ ...data, sec5discription9: e.target.value })} />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form_my">
                            <label for="title" className="form-label">Icon Title Link</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="header">
                  <h2><strong>Section 3</strong> "Contact Form" </h2>
                  <ul className="header-dropdown">
                    <li className="dropdown"> <a href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false"><i className="bi bi-three-dots-vertical"></i></a>
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form_my">
                        <label htmlFor="title" className="form-label">Main Heading</label>
                        <input type="text" className="form-control" value={data.sec6heading} onChange={(e) => setData({ ...data, sec6heading: e.target.value })} />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Main Description</label></p>
                        <textarea id="main Description" name="w3review" rows="2" cols="200" value={data.sec6discription} onChange={(e) => setData({ ...data, sec6discription: e.target.value })}></textarea>
                      </div>
                    </div>



                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Term1</label></p>
                        <textarea id="main Description" name="w3review" rows="2" cols="200" value={data.sec6chackboxtext1} onChange={(e) => setData({ ...data, sec6chackboxtext1: e.target.value })}></textarea>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form_my">
                        <p className="size-cnt"><label htmlFor="w3review" className="form-label">Term2</label></p>
                        <textarea id="main Description" name="w3review" rows="2" cols="200" value={data.sec6chackboxtext2} onChange={(e) => setData({ ...data, sec6chackboxtext2: e.target.value })}></textarea>
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