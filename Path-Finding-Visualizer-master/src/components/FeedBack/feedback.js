import emailjs from '@emailjs/browser';
import React , {useRef}from "react";
import { useNavigate } from 'react-router-dom';
import './feedback.css'

function Feedback (){
    const form = useRef();
    let navigate= useNavigate();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_o3w2fod', 'template_wd9ojaa', form.current, 'PELWJKBu9bPDShKZC')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        navigate('/thankyou')
    };
    return (
          <div className='outer'>
            
              <div className='heading'>Feedback</div>
              <div className='form'>

              <form ref={form} onSubmit={sendEmail}>
          <label>Name</label><br/>
          <input type="text" name="name" /><br/><br/><br/>
          <label>Subject</label><br/>
          <input type="text" name="subject" /><br/><br/><br/>
          <label>Message</label><br/>
          <textarea name="message" /><br/><br/><br/>
          
          <center>          <input type="submit" value="Send" className="button"/></center>

        </form>

              </div>
             

              
           

        
        

          </div>


)

      
}
export default Feedback;