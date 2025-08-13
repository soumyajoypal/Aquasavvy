import React from "react";

const Faucet = ({ position, onInteract }) => {
  return (
    <div
      className="absolute bg-gray-700 w-20 h-20 rounded-lg"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onClick={onInteract}
    >
      <span className="text-white text-center block pt-6">Faucet</span>
    </div>
  );
};

export default Faucet;
