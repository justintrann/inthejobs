import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { updateUser } from "../../features/user/userSlice";
const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);
  // console.log(user);

  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  // FUNC
  const changeHandler = (e) => {
    const obj = e.target.id;
    const val = e.target.value;
    // console.log(obj);
    setUserValue({ ...userValue, [obj]: val });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.values(userValue).some((val) => val.trim() === ""))
      toast.error("Please fill out all field");
    else {
      dispatch(updateUser(userValue));
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h2>Profile</h2>
        <div className="form-center">
          {/* // need: name , labelText, value, type, onChangeHandler,id */}
          <FormRow
            name="name"
            labelText="First Name"
            value={userValue.name}
            onChangeHandler={changeHandler}
            type="text"
          />
          <FormRow
            name="lastName"
            labelText="Last Name"
            value={userValue.lastName}
            onChangeHandler={changeHandler}
            type="text"
          />
          <FormRow
            name="email"
            labelText="email"
            value={userValue.email}
            onChangeHandler={changeHandler}
            type="email"
          />
          <FormRow
            name="location"
            labelText="location"
            value={userValue.location}
            onChangeHandler={changeHandler}
            type="text"
          />
        </div>
        <button className="btn btn-block" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
