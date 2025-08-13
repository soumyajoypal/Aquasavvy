import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalClose } from "../../lib/Slices/tutorialSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint } from "@fortawesome/free-solid-svg-icons";
const ModalComponent = ({ modalData }) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="w-[800px] bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg shadow-xl flex flex-col p-6 relative">
        <div className="bg-gradient-to-br from-blue-400 to-teal-300 w-24 h-24 flex items-center justify-center rounded-full ring-8 ring-teal-700 absolute -top-[66px] -left-10 z-10">
          <FontAwesomeIcon
            icon={faTint}
            className="text-blue-100 text-4xl"
          ></FontAwesomeIcon>
        </div>
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl w-80 flex items-center justify-center absolute border-4 border-teal-900 p-4 -left-2 -top-[60px] tracking-widest">
          <h1 className="text-4xl font-semibold text-teal-800 uppercase audiowide">
            Trivia
          </h1>
        </div>
        <div className="absolute top-4 right-4 text-gray-900">
          <p className="text-sm font-semibold inconsolata">
            {page + 1}/{modalData.length}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-3xl font-bold text-teal-900 mb-4 montserrat">
            {modalData[page].title}
          </h1>
          <p className="text-lg text-gray-800 mb-8 text-center montserrat">
            {modalData[page].description}
          </p>
          <div className="mb-6">{modalData[page].images}</div>
        </div>
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
              className="bg-gradient-to-r montserrat from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </button>
          )}
          {page === modalData.length - 1 && (
            <button
              className="bg-gradient-to-r montserrat from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded transition-all shadow-lg"
              onClick={() => {
                dispatch(setModalClose());
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
