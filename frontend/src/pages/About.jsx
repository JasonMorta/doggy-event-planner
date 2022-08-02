import React from "react";
import "./about.css";
import desktopWidth from '../static/images/desktop.jpg'

export default function About() {
  return (
    <div className="about-container">
      <div className="about">
        <img src={desktopWidth} alt='about' />
      </div>
    </div>
  );
}
