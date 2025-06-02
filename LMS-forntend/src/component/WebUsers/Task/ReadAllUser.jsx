import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../../constant";
import { useNavigate } from "react-router-dom";

const ReadAllUsers = () => {
  let [users, setUser] = useState([]);
  let navigate = useNavigate();
  //   const [name, setName] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [quantity, setQuantity] = useState("");

  let getAllUsers = async () => {
    let result = await axios({
      url: `${url}/web`,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(result.data.result);
    setUser(result.data.result);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    
    try {
      let result = await axios({
        url: `${url}/web/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getAllUsers();
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
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
              <p>User name is {item.fullName}</p>
              <p>User email is {item.email}</p>
              <p>User gender is {item.gender}</p>
              <button
                onClick={(e) => {
                  navigate(`/admin/${item.id}`);
                }}
              >
                View
              </button>
              <button
                onClick={(e) => {
                  navigate(`/admin/update/${item.id}`);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReadAllUsers;
