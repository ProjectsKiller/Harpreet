
// import '../../styles/main/chatbot.css'
import React, { useState, useEffect, useContext } from 'react';
import '../../styles/main/chatbot.css'
import axios from 'axios';

// import '../../styles/main/chat.css'
import { ImCross } from 'react-icons/im';
import SearchContext from '../../Context/Context1';
const Chatbot = () => {
    const isOpen = useContext(SearchContext)
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isHandledByAgent, setIsHandledByAgent] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [enableinp,setEnableinp]=useState(false);


    const [livemsg,setLivemsg]=useState('');
    console.log(isOpen.chatlead,"okay");

    const questions = [
        "Hello! What type of property are you interested in? (e.g., House, Apartment, Land)",
        "Great! Which location do you prefer?",
        "What's your budget range?",
        "How many bedrooms are you looking for?",
    ];

    const inputRef = React.createRef();
    const addMessage = (message, sender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { message, sender },
        ]);
    };

    if (messages.length === 0) {
        addMessage(questions[questionIndex], 'bot');
        setQuestionIndex(questionIndex + 1);
    }
    const askNextQuestion = () => {
        if (questionIndex < questions.length) {
            const question = questions[questionIndex];

            addMessage(question, 'bot');
            setQuestionIndex(questionIndex + 1);
        }
    };

    const sendUserMessage = () => {
        if (userMessage.trim() === '') return;
        // Display user's message
        addMessage(userMessage, 'user');
    
        if (isHandledByAgent) {
            // Simulate a real user handling the chat
            const agentReply = prompt("You're the agent. Type your response:");
            if (agentReply) {
                addMessage(agentReply, 'bot');
            }
        } else {
            // Check if all questions have been asked
            if (questionIndex === questions.length) {
                // If all questions have been asked, prompt the user for a live chat
                const wantsLiveChat = window.confirm("Would you like to initiate a live chat?");
                if (wantsLiveChat) {
                    setEnableinp(true)
                    // Perform the action for initiating a live chat
                    setIsHandledByAgent(true);
                    addMessage("You are now chatting with a live person.", 'bot');
                    // storeUserData(userMessage);
                    // For example, open a live chat window or connect to a live agent
                } else {
                    // If the user doesn't want a live chat, end the conversation
                    console.log("Conversation ended.");
                    // You can perform any cleanup or finalization here
                }
            } else {
                // Ask the next question
                askNextQuestion();
            }
        }
    
        setUserMessage('');
        inputRef.current.value = '';
    };
    

    const openChatbot = () => {
        setIsChatbotOpen(true);
        // localStorage.setItem('isChatbotOpen', isChatbotOpen); 
    };

    const closeChatbot = () => {
        setIsChatbotOpen(false);
        // localStorage.setItem('isChatbotOpen', isChatbotOpen); 
    }

    useEffect(() => {
        isOpen.setISiocnVal(isChatbotOpen);
        localStorage.setItem('isChatbotOpen', isChatbotOpen)
    }, [isChatbotOpen]);




   function sendUserMessagetodb(){
    addMessage(livemsg, 'user');
    let data={senderid:"member2",text:livemsg};
    axios.post("http://localhost:4000/savechat",data).then((res)=>{
      if(res.status===200){
        alert("Chat is sent")
      }
    })
  
   }



    return (
        <>
            {isChatbotOpen && (
                <div class="chatbot-window">
                    <div id="head-strip" style={{ display: 'flex', justifyContent: 'space-between', padding: "4px" }}>
                        <h3 className='mt-2 ml-2'>Raine&Horne</h3>
                        <button id="close-chatbot"
                        // onClick={closeChatbot}
                        >
                        </button>
                        <ImCross id='closeicon' className='mt-3 mr-3' onClick={closeChatbot} />
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`chatbot-message ${message.sender}`}>
                                {message.message}
                            </div>
                        ))}
                    </div>
                    {enableinp ===false ?
                    <div class="chatbot-input">
                        <input
                            id="chatbot-input-text"
                            ref={inputRef}
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    sendUserMessage();
                                }
                            }}
                            placeholder="Type a message..."
                        />
                        <button id="chatbot-send-btn" onClick={sendUserMessage}>Send</button>
                    </div>

                    :
                    <div class="chatbot-input">
                        <input
                            id="chatbot-input-text"
                            ref={inputRef}
                            type="text"
                            value={livemsg}
                            onChange={(e) => setLivemsg(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    sendUserMessagetodb();
                                }
                            }}
                            placeholder="Type a message..."
                        />
                        <button id="chatbot-send-btn" onClick={sendUserMessagetodb}>Send</button>
                    </div>
                    
                }
                </div>
            )
            }
            <div className="bot-icon">

                {isChatbotOpen ? null : (
                    <img
                        src="https://freepngimg.com/thumb/chat/158651-chat-icon-png-file-hd.png"
                        alt=""
                        style={{ width: "50px" }}
                        onClick={openChatbot}
                    />
                )}

            </div>
        </>

    );
};

export default Chatbot;