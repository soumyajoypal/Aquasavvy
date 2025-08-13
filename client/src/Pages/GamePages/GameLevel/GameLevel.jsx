import React from "react";
import { useParams } from "react-router-dom";
import CropLevel from "../../../Levels/FarmLevels/CropLevel/CropLevel";
import KitchenLevel from "../../../Levels/HomeLevels/KitchenLevel/KitchenLevel";
import WaterCoolantLevel from "../../../Levels/IndustryLevels/WaterCoolantLevel/WaterCoolantLevel";
import IrrigationLevel from "../../../Levels/FarmLevels/IrrigationLevel/IrrigationLevel";
import PesticideLevel from "../../../Levels/FarmLevels/PesticideLevel/PesticideLevel";
import BathroomLevel from "../../../Levels/HomeLevels/BathroomLevel/BathroomLevel";
import Cleaningarea from "../../../Levels/HomeLevels/CleaningareaLevel/CleaningareaLevel";
import ToxicWaterTreatmentLevel from "../../../Levels/IndustryLevels/ToxicWaterTreatmentLevel/ToxicWaterTreatmentLevel";
const levelMap = {
  farm: {
    "crop-level": <CropLevel />,
    "irrigation-level": <IrrigationLevel />,
    "pesticide-level": <PesticideLevel />
  },
  home: {
    "kitchen-level": <KitchenLevel />,
    "bathroom-level": <BathroomLevel />,
    "cleaning-level":<Cleaningarea/>
  },
  industry: {
    "water-coolant-level": <WaterCoolantLevel />,
    "toxic-water-treatment-level":<ToxicWaterTreatmentLevel/>
  },
};

const GameLevel = () => {
  const { levelId, elementId } = useParams();
  const elementLevels = levelMap[elementId];
  if (!elementLevels) {
    return <div>Invalid element!</div>;
  }
  const levelComponent = elementLevels[levelId];
  if (!levelComponent) {
    return <div>Invalid level!</div>;
  }
  return <div className="w-full">{levelComponent}</div>;
};

export default GameLevel;
