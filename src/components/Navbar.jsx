import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
       🌍 NewsOrbit
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/business"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Business
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/sports"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Sports
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/science"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Science
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>
        );
    }
export default Navbar;
