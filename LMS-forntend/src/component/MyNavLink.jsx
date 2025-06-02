import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../App";

const MyNavLink = () => {
  // let token = localStorage.getItem("token")
  let global = useContext(GlobalVariableContext);
  // console.log(global);
  return (
    <div style={{ margin: "20px" }}>
      {/* <NavLink to="/product" style={{ margin: "20px" }}>
        Product
      </NavLink>
      <NavLink to="/product/create" style={{ margin: "20px" }}>
        Product Form
      </NavLink>

      <NavLink to="/user" style={{ margin: "20px" }}>
        User
      </NavLink>
      <NavLink to="/user/create" style={{ margin: "20px" }}>
        User Form
      </NavLink> */}

      <NavLink to="/admin/register" style={{ margin: "20px" }}>
        Admin Register
      </NavLink>

      {global.token ? (
        <>
          <NavLink to="/admin/logout" style={{ margin: "20px" }}>
            Logout
          </NavLink>
          <NavLink to="/admin/update-password" style={{ margin: "20px" }}>
            Update Password
          </NavLink>
          <NavLink to="/admin/my-profile" style={{ margin: "20px" }}>
            My Profile
          </NavLink>

          <NavLink to="/admin/read-all-user" style={{ margin: "20px" }}>
            Read All User
          </NavLink>

          <NavLink to="/admin/read-specific-user/id" style={{ margin: "20px" }}>
            Read specific User
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/admin/login" style={{ margin: "20px" }}>
            Admin Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default MyNavLink;
