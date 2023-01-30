import axios from "axios";
import React, { useState } from "react";
import Button from "./Button.jsx";
import "./UploadImagePage.css";

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

  const apiURL = "/api/uploadimage/";

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setFile([file]);
    const formData = new FormData();
    try {
      // do network request down here
      formData.append("image", file, file.name);
      const csrfToken = getCookie("csrftoken");
      await axios.post(apiURL, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
      });
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
