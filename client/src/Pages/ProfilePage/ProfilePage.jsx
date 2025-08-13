import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, setAvatar } from "../../lib/Slices/userSlice";
import apiRequest from "../../lib/utils/apiRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProfilePage.css";
import coin from "../../assets/Icons/coin1.png";
import score from "../../assets/Icons/score.png";
import badges from "../../assets/Icons/badges.png";
import gLevel from "../../assets/Icons/groundwaterLevel.png";
import leaderboard from "../../assets/Icons/leaderboard.png";
import level from "../../assets/Icons/level.png";

const avatarMap = [
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619707/avatars/um7huhxwczbeikjlgwl3.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/pxtago3qjlvicif9mbya.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/ekxely0wscznef87qoci.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/xba9fjk3et0lxnn2oe4c.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/j9g2r7wnooq1s3jh5tnc.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1724619706/avatars/t84v2o60lrdmmouy7kec.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/pq4e6sfixpisivaaskdp.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/sbvcs0qxdjkvnvdrqxlo.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/bigovspguk1epm9ig1kl.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/yxttbwxvcyvolnvsmfg2.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/rdhq4iakhx53qqfav6an.jpg",
  "https://res.cloudinary.com/dzjbxojvu/image/upload/v1725285098/avatars/moftzkygmwuuunwp7fmi.jpg",
];

const ChooseAvatarComponent = ({ selectedImage, setSelectedImage }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-2 my-4 justify-items-center">
      {avatarMap.map((item, index) => (
        <img
          key={index}
          src={item}
          alt={"avatar" + (index + 1)}
          className={`w-16 h-16 rounded-full shadow-md cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform 
    ${
      item === selectedImage
        ? "ring-4 ring-yellow-500"
        : "ring-2 ring-transparent"
    }`}
          onClick={() => setSelectedImage(item)}
        />
      ))}
    </div>
  );
};

const ProfilePage = () => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const uploadImage = async () => {
    setSuccess("");
    if (!selectedImage) {
      setError("Please select an avatar image.");
      return;
    }
    setUploading(true);
    try {
      await apiRequest.post("/upload/uploadAvatar", { avatar: selectedImage });
      dispatch(setAvatar(selectedImage));
      setError(null);
      setSuccess("Avatar updated successfully!");
      setTimeout(() => {
        setSuccess("");
        setSelectedImage(null);
      }, 2000);
    } catch (error) {
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (status === "Loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-300">Loading...</h1>
      </div>
    );
  }

  return (
    <section className="py-4 px-8 bg-gray-950 text-gray-200 min-h-screen">
      <nav className="flex justify-between items-center">
        <p className="text-lg montserrat">
          <Link to="/">
            <FontAwesomeIcon
              className="pr-2 hover:scale-110 "
              icon={faArrowCircleLeft}
            ></FontAwesomeIcon>
          </Link>
          Profile
        </p>
        <button
          onClick={handleLogout}
          className="text-lg montserrat bg-gradient-to-r from-sky-600 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-sky-800 hover:scale-x-105 transition-all transform duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </nav>
      <div className="w-full m-4 flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Div1 - Account Details */}
        <div className="div1 w-full md:w-[60%] lg:w-[40%] h-auto md:h-[36rem] lg:h-[38rem] bg-gradient-to-b from-teal-700 via-blue-800 to-indigo-600 p-6 rounded-lg shadow-lg">
          <div className="m-4">
            <h2 className="audiowide text-2xl tracking-wide mb-4 text-white">
              Account Details
            </h2>
            <div className="flex items-center gap-6">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full border-4 border-gray-700 shadow-md"
              />
              <div>
                <p className="text-lg font-light montserrat text-white">
                  Name: {user.name}
                </p>
                <p className="text-lg font-light montserrat text-white">
                  Username: {user.username}
                </p>
                <p className="text-lg font-light montserrat text-white">
                  Email: {user.email}
                </p>
              </div>
            </div>
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </div>
          <div className="flex flex-col h-[20rem] justify-between p-2">
            <p className="text-center audiowide text-lg">Available Avatars</p>
            <ChooseAvatarComponent
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <button
              className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-3xl hover:scale-x-105 shadow-lg transition-all duration-200 montserrat font-semibold text-lg mt-4"
              onClick={uploadImage}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update Avatar"}
            </button>
          </div>
          {error && (
            <p className="text-red-500 mt-2 bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {/* Div2 - Additional Info */}
        <div className="div2 mx-6 w-full md:w-[60%] lg:w-[60%] h-auto md:h-[36rem] lg:h-[38rem] p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className="p-4 bg-gradient-to-b from-blue-900 to-blue-700 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                Coins Collected
              </h3>
              <img src={coin} alt="coins" className="h-12 w-12 m-2" />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.coins}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-sky-800 to-sky-600 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                Score
              </h3>
              <img src={score} alt="score" className="h-12 w-12 m-2" />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.score}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-teal-700 to-teal-500 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                LeaderBoard Position
              </h3>
              <img
                src={leaderboard}
                alt="leaderboard"
                className="h-12 w-12 m-2"
              />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.leaderBoardPosition}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-emerald-600 to-emerald-400 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                Badges Earned
              </h3>
              <img src={badges} alt="badges" className="h-12 w-12 m-2" />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.badgesEarned}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-cyan-700 to-cyan-500 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                Current Level
              </h3>
              <img src={level} alt="level" className="h-12 w-12 m-2" />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.playerLevel}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-indigo-700 to-indigo-500 rounded-lg">
            <div className="flex flex-col items-center">
              <h3 className="text-lg montserrat font-semibold tracking-wider">
                Groundwater Level
              </h3>
              <img
                src={gLevel}
                alt="groundwater level"
                className="h-12 w-12 m-2"
              />
            </div>
            <p className="inconsolata text-lg text-center mt-4 font-bold">
              {user.groundWaterLevel}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
