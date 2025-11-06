import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";
import logo from "../../assets/images/logoTitle_main.png";

const Layout = ({ children }) => {
  return (
    <div className="layout-bg min-vh-100 d-flex flex-column">
      <header className="d-flex flex-wrap justify-content-between align-items-center p-3 px-md-5 gap-3">
        {/* Logo */}
        <div className="fw-bold fs-4 text-dark d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", maxWidth: "100%" }}
            className="img-fluid"
          />
        </div>

        {/* Responsive date picker */}
        <div className="flex-grow-1 flex-md-grow-0" style={{ maxWidth: "150px" }}>
          <input
            type="date"
            className="form-control w-100"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-fill d-flex justify-content-center align-items-start pt-4 pb-5">
        <div className="bg-white rounded-4 shadow p-4 p-md-5 w-100 mx-3">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
