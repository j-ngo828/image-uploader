import checkmark from "@/assets/check.svg";
import logo from "@/assets/logo.svg";
import LoadingCard from "@/components/LoadingCard";
import PrimaryButton from "@/components/PrimaryButton";
import "@/components/UploadImageCard.scss";
import { baseUrl } from "@/constants";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

const imageApiRoute = `${baseUrl}/images/`;

const getCookie = (name: String) => {
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

function UploadImagePage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const inputFiles = event.target.files;
    if (!inputFiles || inputFiles.length != 1) {
      console.log("Please input exactly one image");
      return;
    }
    const image = inputFiles[0];
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
      let errorMessage = "Unknown Error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  // NOTE: this function is not needed right now
  const fetchImage = async (id: Number) => {
    try {
      const response = await axios.get(`${imageApiRoute}${id}/`, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      });
      setImageUrl(response.data.image);
    } catch (error) {
      let errorMessage = "Unknown Error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
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
          <React.Fragment>
            <div className="dragDropImage">
              <input
                type="image"
                id="image"
                alt="Image upload drag and drop"
                src={logo}
              ></input>
              <label className="promptText" htmlFor="image">
                Drag & Drop your image here
              </label>
            </div>

            <p>Or</p>
            <PrimaryButton
              className="chooseAFile"
              onClick={handleImageUpload}
              text="Choose a file"
            />
          </React.Fragment>
        </React.Fragment>
      )}
    </div>
  );
}

export default UploadImagePage;
