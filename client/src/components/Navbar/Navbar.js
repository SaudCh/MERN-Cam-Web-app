import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/AuthActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 767) && (
        <ul className="list">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <li className="items">Home</li>
          </Link>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <li
              className="items"
              onClick={() =>
                window.scrollTo({
                  left: 0,

                  top: window.innerHeight * 4,
                  behavior: "smooth",
                })
              }
            >
              Contact
            </li>
          </Link>
          {user ? (
            <ul className="list">
              <Link
                to="/settings"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <li className="items">HI! {user.username}</li>
              </Link>

              <Link
                to="/create"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <li className="items">ADD PHOTOS</li>
              </Link>
              <Link
                to="/mycreations"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <li className="items">MY CREATIONS</li>
              </Link>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <li className="items" onClick={() => dispatch(logout())}>
                  Logout{" "}
                </li>
              </Link>
            </ul>
          ) : (
            <ul className="list">
              <Link
                to="/register"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <li className="items">Register</li>
              </Link>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <li className="items">Login</li>
              </Link>
            </ul>
          )}
        </ul>
      )}

      <div className="btn">
        {" "}
        <FontAwesomeIcon icon={faBars} onClick={toggleNav} />
      </div>
    </nav>
  );
}
