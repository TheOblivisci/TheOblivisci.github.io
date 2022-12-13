import React from "react";
import './thankyou.css';
import { useNavigate } from 'react-router-dom';
import  Gif from "../images/thankyou.gif";
function Thankyou(){
    let navigate = useNavigate();
    const navigateToHomePage=()=>{
        navigate('/home');
    }
    return<div>
        <div className="thank-you">
            Thank You.
            <center>
            <div className="box">
            Thank you for using our application, we hope you now  have a better understanding of path finding algorithms.
            Your feedback has been recorded and we will try our best to incorporate it.
            </div>
            <div className="gif-div">
                <center><img src={Gif} className="gif" height={500} width={1000}/></center>
            </div>
            </center>

            <button className="home" onClick={ navigateToHomePage }> Home Page</button>
        </div>
        
    </div> 
    
}
export default Thankyou;