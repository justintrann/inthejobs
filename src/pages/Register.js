import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      toast.info("Stored your login", { toastId: "ls1" });
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const onChangeHandler = (e) => {
    const obj = e.target.id;
    const val = e.target.value;
    setValues({ ...values, [obj]: val });
    // console.log(values);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast("Please Fill Out All Fields");
      return;
    }
    if (!isMember) {
      dispatch(registerUser({ name, email, password }));
    } else dispatch(loginUser({ email, password }));
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />

        <h2>{values.isMember ? "Login" : "Register"}</h2>
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            onChangeHandler={onChangeHandler}
            value={values.name}
          />
        )}
        <FormRow
          name="email"
          type="email"
          onChangeHandler={onChangeHandler}
          value={values.email}
        />
        <FormRow
          name="password"
          type="password"
          onChangeHandler={onChangeHandler}
          value={values.password}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          DEMO ACCOUNT
        </button>
        <p>
          {values.isMember ? "Wanna be part of us?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
