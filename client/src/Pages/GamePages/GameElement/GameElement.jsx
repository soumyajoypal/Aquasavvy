import React from "react";
import { useParams, Outlet } from "react-router-dom";
import FarmComponent from "../../../Components/ElementComponents/FarmComponent/FarmComponent";
import HomeComponent from "../../../Components/ElementComponents/HomeComponent/HomeComponent";
import IndustryComponent from "../../../Components/ElementComponents/IndustryComponent/IndustryComponent";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
const GameElement = () => {
  const { elementId, levelId } = useParams();

  return (
    <ContentWrapper>
      {levelId ? (
        <Outlet />
      ) : (
        <div>
          {elementId === "farm" && <FarmComponent />}
          {elementId === "home" && <HomeComponent />}
          {elementId === "industry" && <IndustryComponent />}
        </div>
      )}
    </ContentWrapper>
  );
};

export default GameElement;
