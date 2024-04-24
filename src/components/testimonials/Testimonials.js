import React, { useEffect, useState } from 'react';
import axios from 'axios'


const Testimonials = () => {

  const [data, setData] = useState([]);
  const [expandedStates, setExpandedStates] = useState(Array(data.length).fill(false));
  const toggleText = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };
  function Test() {
    axios.get(`http://localhost:4000/testimonials`).then((res) => {
      setData(res.data);
    })
  }
  useEffect(() => {
    Test();
  })


  const starColors = ['#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700'];

  return (
    <>

      <section className="offices-ban">
        <div className='' id='main-banner-div'>
          <h2 className='main-banner-heading' style={{}}>Testimonials</h2>
          <p id='main-banner-subdetails' style={{ width: '650px' }}>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur non ipsum nec velit tincidunt euismod at ut turpis.
            Ut accumsan quam quis accumsan hendrerit. Sed est quam, placerat vel lacinia sodales, finibus a erat.</p>
        </div>
      </section>

      <div className='row' style={{ width: "87%", margin: "auto", marginBottom: "60px", marginTop: "50px", justifyContent: "space-around" }}>
  {data.map((item, index) => (
    <div className="card container col-lg-4 col-md-4 col-sm-12" style={{ width: '26rem', margin: '1rem auto', overflow: 'hidden' }} key={index}>
      <div className="card-body">
        <div className="d-flex">
          <div className="all-sub-heading" style={{ textAlign: 'left', fontSize: '20px', width: '260px' }}>
            <div className="ti-name">{item.Name}</div>
            <div className="all-para text-gray-400" style={{ fontSize: '14px' }}>
              {item.time}
            </div>
          </div>
        </div>

        <div className="my-2 mx-0">
          {starColors.map((color, starIndex) => (
            <i key={starIndex} onClick={() => console.log('Star clicked')} style={{ color: color, fontSize: '1.3rem' }} id={starIndex + 1} className="fa fa-star stars"></i>
          ))}
        </div>

        <p className="card-text all-para" style={{ fontSize: '16px', overflow: 'hidden', maxHeight: expandedStates[index] ? 'none' : '100px' }}>
          {item.Review}
        </p>

        <button className="card-link" onClick={() => toggleText(index)}>
          {expandedStates[index] ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default Testimonials;