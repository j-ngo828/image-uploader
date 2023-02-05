import "@/components/PrimaryButton.scss";
import React, { ChangeEventHandler } from "react";

interface PrimaryButtonProps {
  text: string;
  className: string;
  onClick: ChangeEventHandler<HTMLInputElement>;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { className, onClick, text } = props;
  return (
    <React.Fragment>
      <input
        className={`${className} uploadButton`}
        id="fileUpload"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={onClick}
        hidden
      />
      <label htmlFor="fileUpload" className={`${className} uploadButton`}>
        {text}
      </label>
    </React.Fragment>
  );
};

export default PrimaryButton;
