import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride from "react-joyride";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint } from "@fortawesome/free-solid-svg-icons";

const ModalComponent = ({ modalData, setModalOpen }) => {
  const [page, setPage] = useState(0);
  const [run, setRun] = useState(false);
  const dispatch = useDispatch();

  const { currentStep } = useSelector((state) => state.tutorial);

  const steps = [
    {
      target: ".trivia-title", // Class we'll add to the heading
      content:
        "Trivia gives you useful hints before solving tasks. Make sure to read it carefully!",
      placement: "bottom",
    },
    {
      target: ".trivia-content",
      content:
        "Read through this information to improve your chances of solving the challenge!",
      placement: "top",
    },
    {
      target: ".trivia-next-btn",
      content: "Click next when you are ready to proceed.",
      placement: "top",
    },
  ];

  useEffect(() => {
    if (currentStep === 8) {
      setRun(true);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        hideCloseButton
        disableOverlayClose
        spotlightPadding={8}
        styles={{
          options: {
            zIndex: 9999,
            arrowColor: "#1e293b", 
            backgroundColor: "#1e293b", 
            overlayColor: "rgba(0, 0, 0, 0.6)", 
            primaryColor: "#22d3ee", 
            textColor: "#f1f5f9", // 
            width: 350,
          },
          buttonNext: {
            backgroundColor: "#22d3ee",
            borderRadius: "12px",
            padding: "8px 16px",
            fontWeight: "600",
            color: "#0f172a",
          },
          buttonBack: {
            color: "#94a3b8",
            marginRight: "8px",
            fontWeight: "500",
          },
          buttonSkip: {
            color: "#f87171", // red for skip
            fontWeight: "600",
          },
          tooltip: {
            borderRadius: "16px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
            padding: "20px",
          },
          tooltipTitle: {
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "8px",
          },
          tooltipContent: {
            fontSize: "15px",
            lineHeight: "1.6",
          },
        }}
      />

      <div className="w-[800px] bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg shadow-xl flex flex-col p-6 relative">
        {/* Icon */}
        <div className="bg-gradient-to-br from-blue-400 to-teal-300 w-24 h-24 flex items-center justify-center rounded-full ring-8 ring-teal-700 absolute -top-[66px] -left-10 z-10">
          <FontAwesomeIcon icon={faTint} className="text-blue-100 text-4xl" />
        </div>

        {/* Title */}
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl w-80 flex items-center justify-center absolute border-4 border-teal-900 p-4 -left-2 -top-[60px] tracking-widest trivia-title">
          <h1 className="text-4xl font-semibold text-teal-800 uppercase audiowide">
            Trivia
          </h1>
        </div>

        {/* Page counter */}
        <div className="absolute top-4 right-4 text-gray-900">
          <p className="text-sm font-semibold inconsolata">
            {page + 1}/{modalData.length}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center flex-1 trivia-content">
          <h1 className="text-3xl font-bold text-teal-900 mb-4 montserrat">
            {modalData[page].title}
          </h1>
          <p className="text-lg text-gray-800 mb-8 text-center montserrat">
            {modalData[page].description}
          </p>
          <div className="mb-6">{modalData[page].images}</div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-auto">
          {page > 0 && (
            <button
              className="bg-gradient-to-r montserrat from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Prev
            </button>
          )}
          {page < modalData.length - 1 && (
            <button
              className="bg-gradient-to-r montserrat from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg trivia-next-btn"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          )}
          {page === modalData.length - 1 && (
            <button
              className="bg-gradient-to-r montserrat from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
