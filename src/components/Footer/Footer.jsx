import React from "react";
import "./Footer.css";

const Footer = () => {
  const getNewYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className='footer'>
      <p>
        Copyright @{getNewYear()} CryptoPlace
      </p>
    </div>
  );
};

export default Footer;
