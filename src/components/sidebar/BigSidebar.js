import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/BigSidebar";
import Logo from "../Logo";
import NaviLinks from "../NaviLinks";
const BigSidebar = () => {
  const { sidebarShow } = useSelector((state) => state.userSlice);

  return (
    <Wrapper>
      <div className={`sidebar-container ${sidebarShow ? "show-sidebar" : ""}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NaviLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
