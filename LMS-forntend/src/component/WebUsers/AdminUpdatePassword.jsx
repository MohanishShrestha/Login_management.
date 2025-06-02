import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../constant";
import { useNavigate } from "react-router-dom";

const AdminUpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  let token = localStorage.getItem("token");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      oldpassword: oldPassword,
      newpassword: newPassword,
    };

    try {
      let result = await axios({
        url: `${url}/web/update-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/logout");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="oldPassword">Old Password: </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password: </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

export default AdminUpdatePassword;
