import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/SmallSidebar";
import { MdClose as CloseIcon } from "react-icons/md";
import Logo from "../Logo";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../features/user/userSlice";
import NaviLinks from "../NaviLinks";

const SmallSidebar = () => {
  // const { sidebarShow } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.userSlice);

  // FUNC
  const toggleSidebar = () => dispatch(userActions.toggleSidebar());
  return (
    <Wrapper>
      <div className={`sidebar-container ${sidebarShow ? "show-sidebar" : ""}`}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <CloseIcon />
          </button>
          <header>
            <Logo />
          </header>
          <NaviLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
