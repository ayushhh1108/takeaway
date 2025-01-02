// CafeLoader.jsx
import React from "react";
import "./index.css";
import LoaderGif from "../../assets/coffeeLoader.gif"; // Add an SVG or image of a coffee cup

const Loader = ({ message = "Brewing your order..." }) => {
  return (
    <div className="cafe-loader-container">
      <img src={LoaderGif} alt="Loading..." className="loader-gif" />
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;
