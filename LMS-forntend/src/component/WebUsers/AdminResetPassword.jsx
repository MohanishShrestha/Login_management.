import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../constant";

const AdminResetPassword = () => {
  const [Password, setPassword] = useState("");

  let [params] = useSearchParams();
  let token = params.get("token");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: Password,
    };

    try {
      let result = await axios({
        url: `${url}/web/reset-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="Password"> Password: </label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button style={{ cursor: "pointer" }} type="submit">
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminResetPassword;
