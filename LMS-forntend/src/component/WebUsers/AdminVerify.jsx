import axios from "axios";
import React, { useEffect } from "react";
import { url } from "../../constant";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminVerify = () => {
  let [query] = useSearchParams();
  let token = query.get("token");

  let navigate = useNavigate();

  let verifyEmail = async () => {
    try {
      let result = await axios({
        url: `${url}/web/verify-email`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/login")
    } catch (error) {}
  };

  useEffect(() => {
    verifyEmail();
  }, []);
  return <div>AdminVerify</div>;
};

export default AdminVerify;
