import checkmark from "@/assets/check.svg";
import logo from "@/assets/logo.svg";
import LoadingCard from "@/components/LoadingCard";
import PrimaryButton from "@/components/PrimaryButton";
import SuccessfulUpload from "@/components/SuccessfulUpload";
import "@/components/UploadImageCard.scss";
import { acceptedImageType, imageApiRoute } from "@/constants";
import { Image } from "@/types/imageUpload";
import { getCookie } from "@/utils/apiUtils";
import axios from "axios";
import React, { useRef, useState } from "react";

const isValidImage = (files: FileList | null) => {
  if (!files || files.length !== 1) {
    alert("Please input exactly one image");
    return false;
  }
  if (!acceptedImageType.includes(files[0].type)) {
    alert("Please upload png, jpeg, or jpg image only!");
    return false;
  }
  return true;
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
      const response = await axios.post<Image>(imageApiRoute, formData, {
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
      console.error(errorMessage);
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
      console.error(errorMessage);
    }
  };

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
            <p className="helpText">
              File should be in jpeg, jpg or png format.
            </p>
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
                if (!isValidImage(files)) {
                  return;
                }
                const image = files[0];
                handleImageUpload(image);
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
                if (!isValidImage(files)) {
                  return;
                }
                const image = files![0];
                handleImageUpload(image);
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
