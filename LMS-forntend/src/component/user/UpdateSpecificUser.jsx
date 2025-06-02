import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../../constant";
import { toast } from "react-toastify";

const UpdateSpecificUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  let params = useParams();

  let navigate = useNavigate();

  const getData = async () => {
    let result = await axios({
      url: `${url}/user/${params.id}`,
      method: "get",
    });
    console.log(result);
    let data = result.data.result;
    setName(data.name);
    setEmail(data.email);
    setProfileImage(data.profileImage);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      profileImage: profileImage,
    };
    // console.log(data);

    try {
      let result = await axios({
        url: `${url}/user/${params.id}`,
        method: "patch",
        data: data,
      });

      navigate(`/user/${params.id}`)
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

export default UpdateSpecificUser;
