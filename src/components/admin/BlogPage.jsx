import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import { TiPencil } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios'

const BlogPage = () => {
   const createMarkup = (html) => ({ __html: html });
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
  const [mydata, setmydata] = useState([])
  function handleChange(e) {
    const selectedFile = e.target.files[0];

    setFile(URL.createObjectURL(selectedFile));
    setbg1(selectedFile);
  }

  var modules = {
    toolbar: [
      // [{ size: ["small", false, "large", "huge"] }],
      [{ size: ["smallest", "smaller", "small", false, "large", "huge"] }],
      // [{ size: ["5px", "11px", "12px", "13px", false] }], // Add font size options
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  const handleProcedureContentChange = (content) => {
    setData({
      ...data,
      blogtext: content,
    });
  };

  const [data, setData] = useState({
    bgimage: '',
    blogtext: '',
  });

  const [dataupdate, setdataUpdate] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [getId,setId]=useState('');
  useEffect(() => {
    const tablename = "blog"
   	const tablen = {"tablename" : "blog"}
    axios.post(`/staticdata`, tablen).then((res) => {
      setmydata(res.data)
      // setData({
      //   bgimage: res.data[0].bgimage,
      //   blogtext: res.data[0].blogtext,
      // });
    })
  }, []);


function Updateblog(e) {
  e.preventDefault();

  const mydata = {
    blogtext: data.blogtext,
    bg1: bg1,
    blogid: getId,
  };

  axios.post('/updateblogdb', mydata)
    .then((res) => {
      console.log(res.data, "res data");
      if (res.data.msg === "200") {
        alert("Data is updated!");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'blogtext': data.blogtext,
      "bg1": bg1
    }
    const formData = new FormData();

    // Append text data
    formData.append('blogtext', data.blogtext);
    // Handle images
    function appendImageIfDefined(fieldName, fileVariable) {
      if (fileVariable) {
        formData.append(fieldName, fileVariable);
      } else {
        formData.append(fieldName, data[fieldName]);
      }
    }

    appendImageIfDefined('bg1', bg1);
    axios.post(`/bloginsert`, formData).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }
    })
  }


  function removeHtmlTags(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  function extractTextFromHtml(html, elementTag) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var element = doc.querySelector(elementTag);
    return element ? removeHtmlTags(element.innerHTML) : "";
  }

  function EditData(e) {
    const id = e.target.id;
    
    setId(id)
    setIsedit(true)
    const tablename = "blog"
	   const anyid = id
	  	const data = {"tablename" : tablename , "id" : anyid }
 
    axios.post(`/staticdatawithid` , data).then((res) => {
      setdataUpdate(res.data);
      setbg1(res.data[0].bgimage)
      setData({
        bgimage: res.data[0].bgimage,
        blogtext: res.data[0].blogtext,
      });

    })
  }

  return (
    <>
      <div id="whole" style={chgwid}  >

        <div className="row my_box">
          {isedit === 'false' ?
            <>

              <div className="col-sm-12">
                <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data" style={{ backgroundImage: `url('${`/uploads/${dataupdate.bgimage}`}')` }}>

                </form>
                <div className="dz-message drag-icon-cph mt-4">
                  <i className="bi bi-hand-index-thumb"></i>
                  <div className="text-center"><input type="file" onChange={handleChange} /></div>
                </div>
              </div>

              <div className="col-sm-12" style={{ display: "grid", justifyContent: "center" }}>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  //   placeholder={data.privacytext} // Use placeholder to set initial content
                  value={dataupdate.blogtext}
                  onChange={handleProcedureContentChange}
                  style={{ height: "500px", width: "auto", marginTop: "20px", backgroundColor: "black", color: "white", border: "none" }}

                >

                </ReactQuill>

              </div>
            </>
            :
            <>

              <div className="col-sm-12" style={{height:"500px"}}>
                <form action="/" id="frmFileUpload" className="dropzone dz-clickable" method="post" enctype="multipart/form-data" style={{ backgroundImage: `url('${`/uploads/${bg1}`}')` }}>

                </form>
                <div className="dz-message drag-icon-cph mt-12">
                  <i className="bi bi-hand-index-thumb"></i>
                  <div className="text-center"><input type="file" onChange={handleChange} /></div>
                </div>
              </div>

              <div className="col-sm-12" style={{ display: "grid", justifyContent: "center" }}>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={data.blogtext}
                  onChange={handleProcedureContentChange}
                  style={{ height: "500px", width: "960px", marginTop: "20px", backgroundColor: "black", color: "white", border: "none" }}

                >

                </ReactQuill>

              </div>
            </>
          }
          {isedit === false ?
          <div className="col-sm-12 submit-opt mt-5">
            <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Add</button>
          </div>
          :
          <div className="col-sm-12 submit-opt mt-5">
            <button type="submit" className="btn col-sub btn-round" onClick={Updateblog}>Update</button>
          </div>
          }
          <div className="col-md-12">

            <div className="table-responsive">


              <table id="mytable" className="table table-bordred table-striped my-tab">

                <thead>
                  <tr className="tab-head">
                    <th>Sr No.</th>
                    <th>Blog</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
                
                  {mydata.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{extractTextFromHtml(item.blogtext, 'h2')}</td>

                          <td>
                            <button id={item.ID} onClick={EditData} className="icon-tab" style={{ backgroundColor: "yellow" }}>Edit</button>
                          </td>
                        </tr>
                      </>
                    )
                  })}



                </tbody>

              </table>
              <div className="clearfix"></div>
              <ul className="pagination pull-right">
                <li className="disabled"><a href="#"><IoIosArrowBack /></a></li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#"><IoIosArrowForward />
                </a></li>
              </ul>
            </div>
          </div>

        </div>



      </div>

    </>
  );

}

export default BlogPage;