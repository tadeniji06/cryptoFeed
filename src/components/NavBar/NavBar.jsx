import React, { useContext } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const NavBar = () => {
  const navLinks = ["Home", "Features", "Pricing", "Blog"];

  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "ngn": {
        setCurrency({ name: "ngn", symbol: "₦" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
      }
    }
  };
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img className='logo' src={logo} alt='logo' />
      </Link>

      <ul>
        {navLinks.map((navLink, index) => (
          <li key={index}>{navLink}</li>
        ))}
      </ul>
      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value='usd'>USD</option>
          <option value='eur'>EUR</option>
          <option value='ngn'>NGN</option>
        </select>
        <button>
          Sign Up <img src={arrow} alt='arrow' />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
