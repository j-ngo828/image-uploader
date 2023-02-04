import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../constants.js";
import Button from "./Button.jsx";
import checkmark from "./check.svg";
import LoadingCard from "./LoadingCard.jsx";
import "./UploadImagePage.css";

const imageApiRoute = `${baseUrl}/images/`;

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

function UploadImagePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setIsLoading(true);
    const image = event.target.files[0];
    const formData = new FormData();
    try {
      // do network request down here
      formData.append("image", image, image.name);
      const csrfToken = getCookie("csrftoken");
      const response = await axios.post(imageApiRoute, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
      });
      const data = response.data;
      setImageUrl(data.image);
      setTimeout(() => setIsLoading(false), 3500);
    } catch (error) {
      console.log(error.message);
    }
  };

  // NOTE: this function is not needed right now
  const fetchImage = async (id) => {
    try {
      const response = await axios.get(`${imageApiRoute}${id}/`, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });
      setImageUrl(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  // fetchImage(1);

  return isLoading ? (
    <LoadingCard />
  ) : (
    <div className="imageUploader">
      {imageUrl ? (
        <div className="successfulUpload">
          <img src={checkmark} alt="green checkmark" className="checkMark" />
          <p className="successText">Uploaded Successfully!</p>
          <img src={imageUrl} alt="preview" className="imagePreview" />
          <div className="copyLink">
            <p className="imageLink">{imageUrl}</p>
            <button
              className="copyLinkToClipboard"
              type="button"
              onClick={() => navigator.clipboard.writeText(imageUrl)}
            >
              <span className="copyLinkToClipboardText">Copy Link</span>
            </button>
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
            <Button className="chooseAFile" onClick={handleImageUpload} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default UploadImagePage;
