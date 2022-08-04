import React from "react";
import { Bars } from "react-loader-spinner";
import { BUTTON, buttonType } from "../../lib/types";
import { MainButton } from "./style";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  loading?: boolean;
  text: string;
  type?: buttonType;
  className?: string;
  transparent?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  loading,
  text,
  onClick,
  type,
  className,
  transparent,
}) => {
  return (
    <MainButton
      disabled={disabled}
      onClick={onClick}
      transparent={transparent}
      type={type ? type : BUTTON}
      className={`w-full flex flex-row items-center justify-center text-white-main text-sm font-semibold rounded-md  h-[45px] ${className}`}
    >
      {loading ? (
        <Bars width="100" height="30" color="#fff" />
      ) : (
        <p className="text-xs">{text}</p>
      )}
    </MainButton>
  );
};

export default Button;
