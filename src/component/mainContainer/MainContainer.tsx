import React from "react";
import NavBar from "../navBar/NavBar";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}
const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-screen bg-white-bg ${className}  pt-10`}>
      {/*  */}
      <div className="w-full lg:max-w-[80%] xl:max-w-[65%]  mx-auto xl:px-20 lg:px-14 md:px-12 px-5">
        <NavBar />
        <div className="w-full pt-20">{children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
