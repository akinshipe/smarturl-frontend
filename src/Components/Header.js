import React from "react";
import { connect } from "react-redux";

// The header component just displays the header.... this should be a functional component as it handles minimal functionality. If I have time I will re-write it
function Header() {
  return (
    <header id="header" className="d-flex align-items-center header-inner-pages">
      <div className="container-fluid d-flex align-items-center justify-content-lg-between">
        <h2 className="logo me-auto me-lg-0" style={{ marginLeft: "15vw", color: "white" }}>
          SmartURL
        </h2>
      </div>
    </header>
  );
}

export default Header;
