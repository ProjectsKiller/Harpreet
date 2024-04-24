import React, {useContext } from 'react'
import '../../styles/main/whatapp.css'
// import '../../styles/main/whatsapp.css'
import SearchContext from '../../Context/Context1';
const WhatsappChat = () => {
  const isHide = useContext(SearchContext);

  const isChatbotOpen = isHide.iconVal;


  console.log(isChatbotOpen, "chatopen");
  const handleWhatsAppClick = () => {
    // Replace 'your-phone-number' with your actual WhatsApp phone number
    const phoneNumber = '+971521037820';
    const message = 'Hello, I have a question.';
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab with the pre-filled message
    window.open(whatsappURL);
  };


  return (
   <div>

      <div className="whatsapp-icon">
        <div onClick={handleWhatsAppClick}>
          {isChatbotOpen ? null : (
            <div className='row' id="whatsapp-main-div" >
              <img className='col-5 p-0' src="/images/whatsapp.png" alt="WhatsApp" id="whatsapp-image" />

              <h3 className='col-6 mt-1' id='whatsapp-text' style={{ width : "auto"}}>Whatsapp</h3>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default WhatsappChat