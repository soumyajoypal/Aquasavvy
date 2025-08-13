// import React from "react";
// import Hud from "../HUD Component/HudComponent";

// const ContentWrapper = ({ children }) => {
//   return (
//     <section className="w-screen min-h-screen relative">
//       <Hud></Hud>
//       {children}
//     </section>
//   );
// };

// export default ContentWrapper;

// import React from "react";
// import Hud from "../HUD Component/HudComponent";

// const ContentWrapper = ({ children }) => {
//   return (
//     <section className="w-screen min-h-screen relative pt-[80px]"> {/* Adjust 'pt-16' based on Hud's height */}
//       <Hud className="fixed top-0 left-0 w-full z-50" /> {/* Adjust 'h-16' as per the height you want */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </section>
//   );
// };

// export default ContentWrapper;

import React from "react";
import Hud from "../HUD Component/HudComponent";

const ContentWrapper = ({ children }) => {
  return (
    <section className="w-full min-h-screen ">
      <Hud className="fixed top-0 left-0 w-full z-50" />
      <div className="relative top-[64px] h-[90%]">
        {children}
      </div>
    </section>
  );
};

export default ContentWrapper;
