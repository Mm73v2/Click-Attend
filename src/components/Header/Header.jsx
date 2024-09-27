import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <nav className="navbar bg-white shadow">
      <div className="container">
        <a href="#" className="navbar-brand w-25 mx-auto">
          <img src={logo} alt="logo" className="w-100" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
