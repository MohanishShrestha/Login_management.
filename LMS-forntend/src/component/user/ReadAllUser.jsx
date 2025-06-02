import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../constant";
import { useNavigate } from "react-router-dom";

const ReadAllUser = () => {
  let [users, setUsers] = useState([]);
  let navigate = useNavigate();

  const getData = async () => {
    try {
      let result = await axios({
        url: `${url}/user`,
        method: "get",
      });
      // console.log(result.data.result)
      setUsers(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {users.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              border: "solid blue 2px",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "25px",
            }}
          >
            <p>User name is {item.name}</p>
            <p>User email is {item.email}</p>
            <button
              onClick={(e) => {
                navigate(`/user/${item.id}`);
              }}
            >
              View
            </button>
            <button
              onClick={(e) => {
                navigate(`/user/update/${item.id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                navigate(`/user/delete/${item.id}`);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ReadAllUser;
