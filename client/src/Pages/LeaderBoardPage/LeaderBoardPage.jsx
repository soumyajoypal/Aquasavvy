import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderboardItem from "./LeaderboardItem";
import { Vortex } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getLeaderBoard } from "../../lib/Slices/leaderBoardSlice";

const LeaderBoardPage = () => {
  const { status, data, error } = useSelector((state) => state.leaderboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaderBoard());
  }, []);
  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["#4C51BF", "#5A67D8", "#7F9CF5", "#A3BFFA", "#63B3ED"]}
        />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
        <h1 className="text-4xl text-red-500 font-semibold">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-900">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <div className="w-[1000px] border-4 border-yellow-500 rounded-2xl p-4 relative bg-gray-800">
        <div
          className="border-4 border-yellow-300 flex items-center justify-center p-4 rounded-2xl w-96 absolute left-1/2 -top-[40px] -translate-x-1/2"
          style={{ backgroundColor: "#111827" }}
        >
          <h1 className="text-4xl font-bold uppercase text-center text-yellow-200 tracking-wider audiowide">
            Leaderboard
          </h1>
        </div>
        <div className="flex flex-col mt-16">
          {data?.map((item, index) => (
            <LeaderboardItem key={index} item={item} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
