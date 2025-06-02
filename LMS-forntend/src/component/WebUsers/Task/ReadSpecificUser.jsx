import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { url } from "../../../constant";

const ReadSpecificUsers = () => {
  let params = useParams();
  let [users, setUser] = useState({});

  const getData = async () => {
    try {
      let result = await axios({
        url: `${url}/web/${params.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        border: "solid blue 2px",
        marginBottom: "20px",
        padding: "20px",
        borderRadius: "25px",
      }}
    >
      <p>User name is {users.fullName}</p>
      <p>User email is {users.email}</p>
      <p>User gender is {users.gender}</p>
    </div>
  );
};

export default ReadSpecificUsers;
