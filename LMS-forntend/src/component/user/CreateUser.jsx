import axios from "axios";
import React, { useState } from "react";
import { url } from "../../constant";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      password: password,
      profileImage: profileImage,
    };
    // console.log(data);

    try {
      let result = await axios({
        url: `${url}/user`,
        method: "post",
        data: data,
      });

      setName("");
      setEmail("");
      setPasword("");
      setProfileImage("");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
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

          <div>
            <label htmlFor="profileImage">ProfileImage: </label>
            <input
              type="string"
              id="profileImage"
              value={profileImage}
              onChange={(e) => {
                setProfileImage(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button>Send</button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
