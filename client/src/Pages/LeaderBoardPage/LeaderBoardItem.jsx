import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const LeaderboardItem = ({ item, rank }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-500";  // Gold for 1st place
    if (rank === 2) return "text-gray-400";    // Silver for 2nd place
    if (rank === 3) return "text-[#CD7F32]";  // Bronze for 3rd place
    return "text-gray-800";                    // Dark Gray for other ranks
  };

  return (
    <div className="flex items-center gap-2 p-4 rounded-lg shadow-sm bg-transparent">
      <span className={`text-2xl w-8 audiowide mr-4 ${getRankColor(rank)}`}>
        #{rank}
      </span>
      <img
        src={item?.avatar}
        alt="profile-pic"
        className="w-16 h-16 rounded-full mr-4 ring-4 ring-yellow-300"
      />
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 py-2 px-4 rounded-lg w-[800px]">
        <div>
          <div className="text-white inconsolata text-lg">
            <FontAwesomeIcon
              icon={faMedal}
              className={`mr-2 ${getRankColor(rank)} text-xl font-bold`}
            />
            Level {item?.playerLevel}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white montserrat tracking-wider">
          {item?.username}
        </h2>
        <div className="text-xl font-bold text-gray-200 inconsolata">
          {item?.score} pts
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
