import React, { Component, useRef, useState } from "react";
import Button from "./Button.jsx";
import "./UploadImagePage.css";
import axios from "axios";

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

function UploadImagePage(props) {
  const [file, setFile] = useState([]);
  const apiURL = "http://localhost:8000/api/uploadimage/";
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // setFile([...file, file]);
    try {
      reader.onload = async () => {
        const image = reader.result;
        // do network request down here
        const csrfToken = getCookie("csrftoken");
        await axios.post(
          apiURL,
          { image },
          {
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrfToken,
              // 'Access-Control-Allow-Origin': '*',
              // 'Content-Type': 'application/json',
            },
          }
        );
        //   .then((res) => setFile([...file, res.image]))
        //   .catch((err) => console.log(err));
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
