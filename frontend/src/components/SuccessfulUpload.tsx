import PrimaryButton from "@/components/PrimaryButton";
import "@/components/SuccessfulUpload.scss";

interface SuccessfulUploadProps {
  checkmark: string;
  imageUrl: string;
}

function SuccessfulUpload(props: SuccessfulUploadProps) {
  const { checkmark, imageUrl } = props;

  const handleLinkCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(imageUrl);
  };

  return (
    <div className="successfulUpload">
      <img src={checkmark} alt="green checkmark" className="checkMark" />
      <p className="successText">Uploaded Successfully!</p>
      <img src={imageUrl} alt="preview" className="imagePreview" />
      <div className="copyLinkPill">
        <p className="imageLink">{imageUrl}</p>
        <PrimaryButton
          className="copyLinkButton"
          text="Copy Link"
          onClick={handleLinkCopy}
        />
      </div>
    </div>
  );
}

export default SuccessfulUpload;
