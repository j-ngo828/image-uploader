import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <React.Fragment>
      <input
        className={`${props.className} uploadButton`}
        id="fileUpload"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={props.onClick}
        hidden
      />
      <label htmlFor="fileUpload" className={`${props.className} uploadButton`}>
        Choose a file
      </label>
    </React.Fragment>
  );
};

export default Button;
