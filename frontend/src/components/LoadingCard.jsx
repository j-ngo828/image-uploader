import React from "react";
import "./LoadingCard.css";

function LoadingCard(props) {
  return (
    <div className="loadingCard">
      <span>Uploading...</span>
      <div className="loadingBar">
        <div></div>
      </div>
    </div>
  );
}

export default LoadingCard;
