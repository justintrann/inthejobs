import "./App.css";
import React from "react";
import { Landing, Register, Error, ProtectedRoute } from "./pages/";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJobs,
} from "./pages/dashboard";
const Footer = styled.div`
  float: right;
  font-weight: 600;
`;
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* LOG-INSIDE */}
          <Route
            path="/main"
            element={
              <ProtectedRoute test="abc">
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-jobs" element={<AddJobs />} />
            <Route path="edit-jobs/:id" element={<AddJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* OUTSIDE */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer theme="dark" autoClose={1000} />
      </BrowserRouter>
      <Footer>In The Jobs - By Sang H. Tran</Footer>
    </>
  );
}

export default App;
