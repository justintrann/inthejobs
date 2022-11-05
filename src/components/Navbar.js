import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import {
  MdFormatListBulleted as IconList,
  MdSupervisedUserCircle as IconUser,
  MdArrowDropDown as IconDropDown,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { allJobsAction } from "../features/allJobs/allJobsSlice";

const Navbar = () => {
  // Initial
  const [dropdownShow, setDropdownShow] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* LEFT */}
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(userActions.toggleSidebar())}
        >
          <IconList />
        </button>
        {/* CENTER */}
        <div>
          <h3 className="logo-text">dashboard</h3>
        </div>
        {/* RIGHT */}
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setDropdownShow(!dropdownShow)}
          >
            <IconUser />
            {user?.name || "TEST USER"}
            <IconDropDown />
          </button>
          <div className={`dropdown ${dropdownShow ? "show-dropdown" : ""}`}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                toast.info("See you!");
                dispatch(allJobsAction.clearAllJobsState());
                dispatch(userActions.logoutUser());
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
