import React from "react";
import Button from "../button/Button";

interface ScreenErrorLayoutProps {
  error: string;
  retry: () => void;
  className?: string;
}
const ScreenErrorLayout: React.FC<ScreenErrorLayoutProps> = ({
  className,
  error,
  retry,
}) => {
  return (
    <div
      className={`w-full h-screen py-10 flex flex-col items-center justify-center ${className} md:px-10`}
    >
      <p className="text-center text-2xl md:text-3xl xl:text-5xl text-secondary-error font-bold font-mono">
        Oops!
      </p>
      <p className="text-sm md:text-lg font-semibold my-2 text-red-500 text-center">
        {error}
      </p>
      <Button
        text="Try Again"
        onClick={retry}
        className="xl:w-[25%] lg:w-[40%] w-[50%] mt-5"
      />
    </div>
  );
};

export default ScreenErrorLayout;
