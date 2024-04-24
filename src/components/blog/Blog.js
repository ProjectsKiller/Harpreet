import React, {useState, useEffect} from 'react'
import '../../styles/about/about.css'
import axios from 'axios'
import '../../styles/blog/blog.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRipple
} from 'mdb-react-ui-kit';

const Blog = () => {
  
const [blogdata, setblogdata] = useState([]);
const [data,setData]=useState([]);
	
	function GetBAnnerBlog(){
		const blogdata = {"tablename" : "blogbanner"}
    axios.post(`http://localhost:4000/staticdata`, blogdata).then((res) => {
		console.log(res.data,"blog dtaa")
    setData(res.data);

  });
	}
useEffect(() => {
  const blogdata = {"tablename" : "blogs"}
    axios.post(`http://localhost:4000/staticdata`, blogdata).then((res) => {
    setblogdata(res.data)

  });
	GetBAnnerBlog();
}, []);
const createMarkup = (html) => ({ __html: html });
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
};
function extractTextFromHtml1(html, tag, index, charLimit) {
  const match = html.match(new RegExp(`<${tag}.*?>(.*?)<\/${tag}>`, 'g'));
  if (match && match.length > index) {
    const plainText = match[index].replace(new RegExp(`<${tag}.*?>|<\/${tag}>`, 'g'), '');
    return plainText.length > charLimit ? plainText.substring(0, charLimit) + '...' : plainText;
  }
  return '';
}
    return (
        <>
<section className="blog-ban">
  {data.map((item, index) => (
    <div key={index} className='' id='main-banner-div'>
      <h2 className='main-banner-heading' style={{}}>{item.bannerheading}</h2>
      <p id='main-banner-subdetails' style={{ width: '650px' }}>{item.text}</p>
    </div>
  ))}
</section>


            {/********************Blog Section**************** */}
            <div className='row justify-content-center' style={{ width: '87%', margin: '60px auto',marginBottom:"60px"}}>
    <h2 className='text-center mb-8 all-main-heading'>NEWS & INSIGHTS</h2>
    <div className="row inerblog">
        {blogdata.map((item, index) => {
            const extractedText = extractTextFromHtml1(item.content, 'p', 0, 75);
            const imageUrl = item.featuredHome ? `uploads/${item.featuredHome}` : `uploads/${item.featured_image}`;
            return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-6 no-right-margin" key={index}>
                    <a href={`/${item.url}`}>
                        <img src={imageUrl} alt="Los Angeles" className="img-fluid" style={{ width: "100%" }} />
                    </a>
                    <p className='mt-3'>{formatDate(item.date)}</p>
                    <h1 className='all-sub-heading' style={{ textAlign: "left" }}>{item.title}</h1>
                    <p>{extractedText}</p>
                </div>
            )
        })}
    </div>
</div>

        </>
    )
}

export default Blog
