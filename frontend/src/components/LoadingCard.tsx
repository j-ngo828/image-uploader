import "@/components/LoadingCard.scss";

function LoadingCard() {
  return (
    <div className="loadingCard">
      <span>Uploading...</span>
      <div className="loadingBar">
        <div></div>
      </div>
    </div>
  );
}

export default LoadingCard;
