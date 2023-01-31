import axios from "axios";
import React, { useState } from "react";
import Button from "./Button.jsx";
import checkmark from "./check.svg";
import LoadingCard from "./LoadingCard.jsx";
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
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiURL = "/api/uploadimage/";

  const handleImageUpload = (event) => {
    setIsLoading(true);
    const image = event.target.files[0];
    const formData = new FormData();
    try {
      // do network request down here
      formData.append("image", image, image.name);
      const csrfToken = getCookie("csrftoken");
      axios
        .post(apiURL, formData, {
          headers: {
            "Content-type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        })
        .then((response) => {
          setImage({ image: response.data.image });
          setTimeout(() => setIsLoading(false), 3000);
        });
    } catch (error) {
      // prints message here
      window.alert("Please upload a PNG, JPEG File or JPG File!");
    }
  };

  return isLoading ? (
    <LoadingCard />
  ) : (
    <div className="imageUploader">
      {image ? (
        <div className="successfulUpload">
          <img src={checkmark} alt="green checkmark" className="checkMark" />
          <p className="successText">Uploaded Successfully!</p>
          <img src={image.image} alt="preview" className="imagePreview" />
          <div className="copyLink">
            <p>{image.image}</p>
          </div>
        </div>
      ) : (
        <React.Fragment>
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
              <label className="imageUploadLabel" htmlFor="image">
                Drag & Drop your image here
              </label>
            </div>

            <p>Or</p>
            <Button onClick={handleImageUpload} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default UploadImagePage;
