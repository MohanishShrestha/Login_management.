import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../constant";

const ReadSpecificUser = () => {
  let params = useParams();
  let [user, setUsers] = useState({});

  const getData = async () => {
    let result = await axios({
      url: `${url}/user/${params.id}`,
      method: "get",
    });
    setUsers(result.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(params);
  return (
    <div
      style={{
        border: "solid blue 2px",
        marginBottom: "20px",
        padding: "20px",
        borderRadius: "25px",
      }}
    >
      <p>User Name = {user.name}</p>
      <p>User email = {user.email}</p>
    </div>
  );
};

export default ReadSpecificUser;
