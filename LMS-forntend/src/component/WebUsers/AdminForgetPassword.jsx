import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../constant";
import { useNavigate } from "react-router-dom";

const AdminForgetPassword = () => {
  const [email, setEmail] = useState("");

  let token = localStorage.getItem("token");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
    };

    try {
      let result = await axios({
        url: `${url}/web/forget-password`,
        method: "post",
        data: data,
      });
      setEmail("");
      toast.success("Link has been sent to ur email to reset password");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button type="submit">Forget password</button>
        </div>
      </form>
    </>
  );
};
export default AdminForgetPassword;
