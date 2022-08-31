import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className={`${props.ringClassName} lds-dual-ring`}></div>
    </div>
  );
};

export default LoadingSpinner;
