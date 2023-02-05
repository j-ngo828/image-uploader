import "@/components/PrimaryButton.scss";
import { MouseEventHandler } from "react";

interface PrimaryButtonProps {
  text: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { className, onClick, text } = props;
  return (
    <button
      className={`primaryButton ${className}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
