import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../App";
import { url } from "../../constant";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  let navigate = useNavigate()
  let global = useContext(GlobalVariableContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    // console.log(data);

    try {
      let result = await axios({
        url: `${url}/web/login`,
        method: "post",
        data: data,
      });

      let token = result.data.token;
      localStorage.setItem("token", token);
      global.setToken(token)
      navigate("/admin")

    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button style={{ cursor: "pointer" }} type="submit">
            Login{" "}
          </button>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/admin/forget-password");
          }}
        >
          Forget Password
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
