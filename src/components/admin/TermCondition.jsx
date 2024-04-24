import React, { useState, useEffect, useContext } from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import UserContext from "../../Context/UserContext";
import axios from 'axios'

const TermCondition = () => {
  const [chgwid, setChgwid] = useState({ margin: "90px 0px 15px 250px" })
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
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
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
      termtext: content,
    });
  };

  const [data, setData] = useState({
    termtext: '',
  });



  useEffect(() => {
    const tablename = "termcondition";
    const tablen = {"tablename" : "termcondition"}
          axios.post(`/staticdata` , tablen).then((res) => {
      setData({
        termtext: res.data[0].termtext,
      });
    })
  }, []);

  function UpdataData(e) {
    e.preventDefault();
    let mydata = {
      'termtext': data.termtext
    }

    axios.post(`/updateterm`, mydata).then((res) => {
      if (res.data.msg === "200") {
        alert("Data is updated!")
      }
    })
  }




  return (
    <>
      <main id="whole" style={chgwid}>
        <div style={{ marginTop: "80px" }}>

          <div style={{ display: "grid", justifyContent: "center" }}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              //   placeholder={data.privacytext} // Use placeholder to set initial content
              value={data.termtext}
              onChange={handleProcedureContentChange}
              style={{ height: "500px", marginTop: "20px", backgroundColor: "black", color: "white", border: "none" }}

            >

            </ReactQuill>

          </div>


        </div>
        <div className="col-sm-12 submit-opt mt-" style={{ marginTop: "100px" }}>
          <button type="submit" className="btn col-sub btn-round" onClick={UpdataData}>Update</button>
        </div>
      </main>
    </>
  );

}

export default TermCondition;