import React, { useEffect, useState } from "react";
import RightSideComponent from "./Right";
import LeftComponent from "./Left";
import WhatsappChat from "../Notification/Whatapp";
import Chatbot from "../Notification/Chatbot";
import axios from "axios";
import Gallery from "react-image-gallery";
import Modal from "react-bootstrap/Modal";
import '../../styles/internal/internal.css'


const SingleProperty = () => {

       const [singledata, setdata] = useState([]);
    const [images1, setimages1] = useState([]);




    useEffect(() => {
        const id = localStorage.getItem('propertyid')
        axios
            .get(`http://localhost:4000/singleproperty1/${id}`)
            .then((res) => {
                const data = JSON.parse(res.data[0].Imagelink)
				setimages1(data)
            })
            .catch((error) => {
                console.error("Error fetching data from the server:", error);
            });
    }, []);
 
  

    
   

   
    const [currentimg,setCurrentimg] = useState('0');
    const [lastIndex,setLastIndex] = useState();
    
    const newFun = (ind)=>{
        let b = document.getElementById(ind);
        setCurrentimg(ind);
        console.log(ind, " = Image value"); 
        setLastIndex(images1.length-1)
        console.log(ind, " = current, last = ", lastIndex); 
        let c = document.getElementById("upBox")
        c.classList.add("hkfhkah")
        c.classList.remove("notVisible")
        const p = document.getElementById("jhyu354hu")
        let imgSource = b.getAttribute('src')
        let q = document.getElementById("gfy6569yueyu")
        if(q === null){
            let image = document.createElement("img");
            image.src = imgSource;
            image.alt = "Error loading image";
            image.id = "gfy6569yueyu";
            image.className = "main-image1"
    p.appendChild(image);
        }else{
            q.setAttribute('src',`${imgSource}`)
        }
        
    }
    let Remove = ()=>{
        let c = document.getElementById("upBox")
        
        
        c.classList.toggle("hkfhkah")
        c.classList.add("notVisible")
        setCurrentimg(0);
    }


    function handleClick(event) {
        // Check if the clicked element is not an image
        if (event.target.tagName !== 'IMG') {
            Remove(); // Run the Remove function
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 39) {
                next();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 37) {
                previous();
            }
        });
        console.log(currentimg, " = current, last = ", lastIndex);
    }, [currentimg, lastIndex]);



    const handleKeyDown = (event) => {
        
        if (event.key === "ArrowLeft") {
            previous();
        } else if (event.key === "ArrowRight") {
            next();
        }
    };
    let previous = () => {
        if (currentimg === 0) {
            setCurrentimg(lastIndex);
        } else {
            setCurrentimg(prevState => currentimg - 1);
        }
    
        let d = document.getElementById(currentimg);
        if (d) {
            let imgSource = d.getAttribute('src');
            let u = document.getElementById("gfy6569yueyu");
            if (u) {
                u.setAttribute('src', imgSource);
            } else {
                console.error("Element with id 'gfy6569yueyu' not found.");
            }
        } else {
            console.error(`Element with id ${currentimg} not found.`);
        }
    }

let next = () => {
    if (currentimg === lastIndex) {
        setCurrentimg(0);
    } else {
        setCurrentimg(prevState => currentimg + 1);
    }

    let d = document.getElementById(currentimg);
    if (d) {
        let imgSource = d.getAttribute('src');
        let u = document.getElementById("gfy6569yueyu");
        if (u) {
            u.setAttribute('src', imgSource);
        } else {
            console.error("Element with id 'gfy6569yueyu' not found.");
        }
    } else {
        console.error(`Element with id ${currentimg} not found.`);
        }
    }

let first = images1[0];
let second = images1[1];
let third = images1[2];
let fourth = images1[3];
let fifth = images1[4];


    return (
        <>
		
	

    <div id="upBox" className='notVisible' onClick={handleClick}>
    <div className='allBtnsss'>

        <img src="/images/Cross.png" alt="Cross logo"  id="cross" onClick={Remove} className="crossx" />
        
    </div>
        <div className='keyuqui'>
        <div className='tpiuw'>
        <img src="/images/Left.png" alt="Left logo" onClick={previous} className='tmjiuw'/>
        </div>
        <div id="jhyu354hu">

        </div>
        <div className='tdy98afy'>
        <img  src="/images/Right.png" alt="Right logo" onClick={next} className='tkafy' />
        </div>
        </div>

    </div>

        

            <div>
           <div style={{ width: "87%", margin: "auto" }}>

           <div className='da1s4gf  ' style={{padding:"0px",width:"100%"}}>
    {images1.map((image, index) => (
        index == 4 ? 
        <div className="Visible_div">
        <div className="newfjhjdhk">
        <img src={first} alt="one" id="0" onClick={()=> newFun(0)} className={`kaghuyg`}/>
        </div>
        <div className="ytttythk">
        <img src={second} alt="two" id="1" onClick={()=> newFun(1)} className={"jvhsxcdc main-jg"} />
        <img src={third} alt="three" id="2" onClick={()=> newFun(2)} className={"gyufwt main-jg"} />
        <img src={fourth} alt="four" id="3" onClick={()=> newFun(3)} className={"gyuggf main-jg"} />
        <img src={fifth} alt="five" id="4" onClick={()=> newFun(4)} className={"yjgewgs main-jg"} />
        </div>
        </div>
           
        : index >= 5?
        <img key={index} src={image} alt={index} id={index} onClick={() => newFun(index)} className='noyt'/>
        : null
    ))}
    
</div>
<div className="row" >

<div className="col-12 col-sm-12 col-md-12	col-lg-8 col-xl-8" style={{ padding: "0px" }}>
    <LeftComponent />
</div>

<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{ padding: '0px' }}>
    <RightSideComponent />
</div>
</div>
           </div>
               


                <WhatsappChat />
                <Chatbot />
            </div>
        </>
    );
};

export default SingleProperty;