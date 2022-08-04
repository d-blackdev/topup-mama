import React from "react";

interface AuthContainerProps {
  children: React.ReactNode;
  className?: string;
}
const AuthContainer: React.FC<AuthContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`${className} bg-white-text w-screen h-screen flex flex-row items-center justify-center`}
    >
      <div className="w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white-bg h-[40%] md:h-[40%] lg:h-[40%] xl:h-[55%] rounded-md">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
