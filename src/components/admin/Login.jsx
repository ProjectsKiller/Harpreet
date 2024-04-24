import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
export default function Login() {
    const navigate = useNavigate();
    const userVal = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const hasTokenCookie = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='));

    if (hasTokenCookie) {
        console.log('User has the token cookie.');
        //   userVal.setIslogged(true);
    } else {
        // userVal.setIslogged(false);
        console.log('User does not have the token cookie.');
    }
    function LoginUser(e) {
        e.preventDefault();
        let data = { 'username': username, "password": password }
        axios.post(`http://localhost:4000/login`, data)
            .then((res) => {
                const type = res.data[0].type
                if (res.data) {
                    alert("Login Successfully!");
                    localStorage.setItem("user", "76342391251#@%#^%*(^%&^$$%#@$%448941/*-++y$#%$^^&^*$@");
                    localStorage.setItem("usertype", type);
                    navigate('/backend');
                } else {
                    localStorage.removeItem("admin");
                    alert("Unexpected response from the server");
                }
            })
            .catch((error) => {
                alert("Error during login. Please try again.");
            });
    }
    function Backtohome() {
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    useEffect(() => {
        const id = "%@#^#%&^*%^&$%@@^@%$%^,^$#@@#8757636345^$%^$%&32422"
        localStorage.setItem("admin", id)
    }, [])

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt >
                            <img src="/images/loginicon.webp" alt="IMG"  style={{ maxWidth: "250px" , marginBottom : "10px" }} />
                           <button onClick={Backtohome} type="submit" className="btn btn-primary ml-5">Back To Home</button>
                        </div>

                        <form className="login100-form validate-form" >
                            <span className="login100-form-title">
                                Member Login
                            </span>

                            {/* <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz"> */}
                            <input className="input100" type="text" name="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                            {/* </div> */}

                            {/* <div className="wrap-input100 validate-input" data-validate="Password is required"> */}
                            <input className="input100 mt-4" type="password" name="pass" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            {/* </div> */}

                            <div className="container-login100-form-btn">
                                <a href="" className="login100-form-btn" onClick={LoginUser}>Login</a>
                            </div>

                            <div className="text-center pt-12">
                                <span className="txt1">Forgot</span>
                                <a className="txt2" href="#">Username / Password?
                                </a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

