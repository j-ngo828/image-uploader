import React, { Component, useRef, useState } from "react";
import Button from "./Button.jsx";
import "./UploadImagePage.css";
import axios from "axios";

function UploadImagePage(props) {
  const [file, setFile] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // setFile([...file, file]);
    try {
      reader.onload = async () => {
        const image = reader.result;
        // do network request down here
      };
    } catch (error) {
      // prints message here
      window.alert("Please upload a PNG, JPEG File or JPG File!");
    }
  };

  return (
    <div className="imageUploader">
      <div className="header">
        <h2 className="title">Upload your Image</h2>
        <p className="helpText">File should be Jpeg, Png, ...</p>
      </div>
      <div className="imageUploadPrompt">
        <div className="dragDropImage">
          <input
            type="image"
            id="image"
            alt="Image upload drag and drop"
            src="../logo.svg"
          ></input>
          <label className="imageUploadLabel" for="image">
            Drag & Drop your image here
          </label>
        </div>

        <p>Or</p>
        <Button
          onClick={(event) => {
            document.getElementById("fileUpload").click();
            document.getElementById("fileUpload").onchange = handleImageUpload;
          }}
        />
      </div>
    </div>
  );
}

export default UploadImagePage;
