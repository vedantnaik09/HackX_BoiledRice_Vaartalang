import React, { useState } from "react"; // Import useState hook

import "./style/loginUserAdmin.css";

export const Home = () => {
  const [circlePosition, setCirclePosition] = useState(null);

  const moveCircle = (e) => {
    setCirclePosition({ x: e.clientX, y: e.clientY });
  };

  const removeCircle = () => {
    setCirclePosition(null);
  };

  return (
    <div className="flex justify-center" style={{ height: "100vh" }}>
      <div className="flex-1 border-r border-r-slate-400 flex justify-center items-center flex-col">
        <div className="logo"></div>
        <div className="adminSide">ADMIN LOGIN</div>
        <a
          className="enter"
          onMouseMove={moveCircle}
          onMouseLeave={removeCircle}
        >
          <span>ENTER</span>
        </a>
        {circlePosition && (
          <span
            className="circle"
            style={{ top: circlePosition.y, left: circlePosition.x }}
          ></span>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="logo"></div>
        <div className="clientSide">CLIENT LOGIN</div>
        <a
          className="enter"
          onMouseMove={moveCircle}
          onMouseLeave={removeCircle}
        >
          <span>ENTER</span>
        </a>
        {circlePosition && (
          <span
            className="circle"
            style={{ top: circlePosition.y, left: circlePosition.x }}
          ></span>
        )}
      </div>
    </div>
  );
};
