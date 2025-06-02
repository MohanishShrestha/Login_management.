import { Outlet, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";

import HomePage from "./HomePage";
import CreateProduct from "./product/CreateProduct";
import DeleteProduct from "./product/DeleteProduct";
import ReadAllProduct from "./product/ReadAllProduct";
import ReadSpecificProduct from "./product/ReadSpecificProduct";
import UpdateSpecificProduct from "./product/UpdateSpecificProduct";
import CreateUser from "./user/CreateUser";
import DeleteUser from "./user/DeleteUser";
import ReadAllUser from "./user/ReadAllUser";
import ReadSpecificUser from "./user/ReadSpecificUser";
import UpdateSpecificUser from "./user/UpdateSpecificUser";
import AdminLogin from "./WebUsers/AdminLogin";
import AdminLogout from "./WebUsers/AdminLogout";
import AdminMyProfile from "./WebUsers/AdminMyProfile";
import AdminRegister from "./WebUsers/AdminRegister";
import AdminUpdatePassword from "./WebUsers/AdminUpdatePassword";
import AdminUpdateProfile from "./WebUsers/AdminUpdateProfile";
import AdminVerify from "./WebUsers/AdminVerify";
import AdminForgetPassword from "./WebUsers/AdminForgetPassword";
import AdminResetPassword from "./WebUsers/AdminResetPassword";
import ReadAllUsers from "./WebUsers/Task/ReadAllUser";
import ReadSpecificUsers from "./WebUsers/Task/ReadSpecificUser";
import UpdateSpecificUsers from "./WebUsers/Task/UpdateSpecificUsers";
import { useContext } from "react";
import { GlobalVariableContext } from "../App";

const MyRoutes = () => {
  let { token, setToken } = useContext(GlobalVariableContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route
          path="verify-email"
          element={<AdminVerify></AdminVerify>}
        ></Route>

        <Route path="reset-password" element={<AdminResetPassword />}></Route>

        <Route path="/product" element={<Outlet></Outlet>}>
          <Route index element={<ReadAllProduct />}></Route>
          <Route path="create" element={<CreateProduct />} />
          <Route path=":id" element={<ReadSpecificProduct />} />
          <Route path="update/:id" element={<UpdateSpecificProduct />} />
          <Route path="delete/:id" element={<DeleteProduct />} />
        </Route>

        <Route path="/user" element={<Outlet></Outlet>}>
          <Route index element={<ReadAllUser />} />
          <Route path="create" element={<CreateUser />} />
          <Route path=":id" element={<ReadSpecificUser />} />
          <Route path="update/:id" element={<UpdateSpecificUser />} />
          <Route path="delete/:id" element={<DeleteUser />} />
        </Route>

        <Route path="/admin" element={<Outlet></Outlet>}>
          <Route path="register" element={<AdminRegister />}></Route>

          {token ? (
            <>
              <Route
                index
                element={<div>This is admin dash board</div>}
              ></Route>
              <Route
                path="update-password"
                element={<AdminUpdatePassword />}
              ></Route>
              <Route
                path="update-profile"
                element={<AdminUpdateProfile />}
              ></Route>

              <Route path="logout" element={<AdminLogout />}></Route>

              <Route path="my-profile" element={<AdminMyProfile />}></Route>

              <Route path="read-all-user" element={<ReadAllUsers />}></Route>

              <Route path="update" element={<Outlet></Outlet>}>
                <Route path=":id" element={<UpdateSpecificUsers />}></Route>
              </Route>

              <Route path=":id" element={<ReadSpecificUsers />}></Route>
            </>
          ) : (
            <>
              <Route path="login" element={<AdminLogin />}></Route>
              <Route
                path="forget-password"
                element={<AdminForgetPassword />}
              ></Route>
            </>
          )}
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};

export default MyRoutes;

/* 
while getting token
  add token to useContext from localStorage

if other components needs token 
  get token from useContext rather than localstorage (for page referesh purpose)

while change token 
   change to localstorage
   change to useContext


*/
