import checkmark from "@/assets/check.svg";
import logo from "@/assets/logo.svg";
import LoadingCard from "@/components/LoadingCard";
import PrimaryButton from "@/components/PrimaryButton";
import SuccessfulUpload from "@/components/SuccessfulUpload";
import "@/components/UploadImageCard.scss";
import { baseUrl } from "@/constants";
import axios from "axios";
import React, { useRef, useState } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    const image = file;
    const formData = new FormData();
    try {
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
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      let errorMessage = "Unknown Error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  const handleClick = () => {
    const element = imageInput.current;
    if (!element) {
      return;
    }
    element.click();
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
        <SuccessfulUpload
          checkmark={checkmark}
          imageUrl={imageUrl}
        />
      ) : (
        <React.Fragment>
          <div className="header">
            <h2 className="title">Upload your Image</h2>
            <p className="helpText">File should be Jpeg, Png, ...</p>
          </div>
          <React.Fragment>
            <div
              className={`${isDragging ? "dragging" : ""} dragDropImage`}
              onDragEnter={(event) => {
                event.stopPropagation();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.stopPropagation();
                setIsDragging(false);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                const files = event.dataTransfer.files;
                if (!files || files.length !== 1) {
                  console.log("Please input exactly one image");
                  return;
                }
                handleImageUpload(files[0]);
              }}>
              <img
                alt="Image upload drag and drop"
                src={logo}
              />
              <label
                className="promptText"
                htmlFor="imageUpload">
                Drag & Drop your image here
              </label>
            </div>

            <p className="optionText">Or</p>
            <input
              id="imageUpload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={imageInput}
              onChange={(event) => {
                const files = event.target.files;
                if (!files || files.length !== 1) {
                  console.log("Please input exactly one image");
                  return;
                }
                const file = files[0];
                handleImageUpload(file);
              }}
              hidden
            />
            <PrimaryButton
              className="chooseAFile"
              onClick={handleClick}
              text="Choose a file"
            />
          </React.Fragment>
        </React.Fragment>
      )}
    </div>
  );
}

export default UploadImagePage;
