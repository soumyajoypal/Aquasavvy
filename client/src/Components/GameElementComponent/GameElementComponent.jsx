import React from "react";
import FarmComponent from "../ElementComponents/FarmComponent/FarmComponent";
import HomeComponent from "../ElementComponents/HomeComponent/HomeComponent";
import IndustryComponent from "../ElementComponents/IndustryComponent/IndustryComponent";
import { useSelector } from "react-redux";
const GameElementComponent = () => {
  const { selectedElement } = useSelector((state) => state.tutorial);

  return (
    <section className="w-full min-h-screen relative bg-gray-100 flex flex-col">
      <div className="flex justify-center items-center">
        {selectedElement === "farm" && <FarmComponent />}
        {selectedElement === "home" && <HomeComponent />}
        {selectedElement === "industry" && <IndustryComponent />}
      </div>
    </section>
  );
};

export default GameElementComponent;
