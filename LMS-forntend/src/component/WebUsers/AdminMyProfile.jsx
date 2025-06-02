import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../constant";
import { useNavigate } from "react-router-dom";

const AdminMyProfile = () => {
  let token = localStorage.getItem("token");
  let [profile, setProfile] = useState({});
  let navigate = useNavigate();

  let getAdminProfile = async () => {
    try {
      let result = await axios({
        url: `${url}/web/my-profile`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getAdminProfile();
  }, []);
  return (
    <div>
      <p>Name = {profile.fullName}</p>
      <p>Gender = {profile.gender}</p>
      <p>Date of birth = {new Date(profile.dob).toLocaleDateString()}</p>
      <p>Email = {profile.email}</p>
      <p>Role = {profile.role}</p>
      <button
        onClick={() => {
          navigate("/admin/update-profile");
        }}
      >
        Update Profile
      </button>
    </div>
  );
};

export default AdminMyProfile;
