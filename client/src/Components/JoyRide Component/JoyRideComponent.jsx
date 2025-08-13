import React from "react";
import Joyride, { STATUS } from "react-joyride";
const JoyRideComponent = ({ steps, run, setRun }) => {
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      disableOverlayClose={true}
      callback={handleJoyrideCallback}
    ></Joyride>
  );
};

export default JoyRideComponent;
