import React, { useState } from "react";
import "./Header.css";

const Header = (props) => {

  return (
    <div className="Header">
      <div className="Header_content">
        <h2 className="Header__h2"> Currency Exchange Form</h2>
        <div className="Header__text">
          Place to exchange your money to our currency, please insert the amount you want to exchange   
        </div>
      </div>
    </div>
  );
};
//export component
export default Header;
