import React from "react";
import styled from "styled-components";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <MainLoader className="absolute top-0 right-0 left-0 bottom-0 flex flex-row items-center justify-center bg-white h-screen w-screen">
      <BallTriangle
        height="100"
        width="100"
        color="#166CB4"
        ariaLabel="loading-indicator"
      />
    </MainLoader>
  );
};

export default Loader;

const MainLoader = styled.div`
  z-index: 1000;
`;
