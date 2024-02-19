import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Predict from "../Integration/Predict";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { MdBubbleChart } from "react-icons/md";
import Home from "./Home";
import AboutUs from "./AboutUs";
import "./routes.css";
import HowToUse from "./HowToUse";
const Routing = () => {
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <nav className="navbar">
          <div className="logo__id">
            <div className="logo">
              <MdBubbleChart style={{ fontSize: "50px", color: "#1D5B79" }} />
            </div>
            <div className="navcontent">
              <h3 style={{ fontWeight: "normal", fontSize: "1.5rem" }}>
                AnemiaNet
              </h3>
            </div>
          </div>
          <div className="page_routes">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/prediction">Prediction</Link>
              </li>
              <li>
                <Link to="/howtouse">How to use</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li onClick={userSignOut}>Sign Out</li>
            </ul>
          </div>
        </nav>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Predict />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/howtouse" element={<HowToUse />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default Routing;
