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
        hidden
      />
      <button
        className={`${props.className} uploadButton`}
        type="button"
        onClick={props.onClick}
      >
        Choose a file
      </button>
    </React.Fragment>
  );
};

export default Button;
{
  /*  */
}
