import "./header.css";
import React from "react";
import videoBg from "./Video/videoBg.mp4";

export default function Header() {
  return (
    <div className="i">
      <div className="i-right">
        <div className="i-bg">
          <video src={videoBg} autoPlay loop muted />
        </div>
      </div>
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Welcome to:</h2>
          <h1 className="i-name">Photo Blog</h1>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Junior </div>
              <div className="i-title-item">Student</div>
              <div className="i-title-item">Beautifull</div>
              <div className="i-title-item">Content </div>
              <div className="i-title-item">Content </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
