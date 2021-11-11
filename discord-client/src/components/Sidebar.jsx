import React from "react";
import NavIcon from "./common/NavIcon";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import "./Sidebar.scss";
import SubSidebar from "./SubSidebar";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      <div className="hide-scrollbar w-20 px-2 py-3 h-full bg-gray-900 overflow-y-scroll">
        <NavIcon title={faDiscord} to="/dashboard"></NavIcon>
        <NavIcon title="BallonMan's server" to="/server/1" />
        <NavIcon title="+" action={() => console.log("ok")}></NavIcon>
      </div>
      <SubSidebar/>
    </div>
  );
};

export default Sidebar;
