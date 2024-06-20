import React from "react";
import "./SignForm.css";
const SignForm = (props)=>{
return(
<div className="Form">
  <div className="Form_content">
  <h2 className="Form__h2">Save time, save money!</h2>
  <div className="Form__text2">sign up and we send the best deals to you</div>
  </div>
  <div className="Form_inputlayout">
  <form   className="Form__searchbar">
    <input  
            className ="Form_input"
            type="text"
            placeholder="Your Email"
          />
  </form> 
      <button type="submit" className="Form__button">Subcribe </button>
  </div>
   </div>)
};
//export component
export default SignForm;



