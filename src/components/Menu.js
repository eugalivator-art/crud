import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const logoutHandler = () => {
    localStorage.clear();
    window.location = "http://localhost:3000";
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            React REST API
          </Link>
          <button
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#menu"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse" id="menu">
          {localStorage.getItem("user") ? (
            <ul className="nav navbar-nav">
              <li>
                <Link to="/course">Courses</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <a
                  href
                  onClick={() => logoutHandler()}
                  className="btn btn-danger"
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
