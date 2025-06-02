import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../../constant";
import htmlDateFormat from "../../../utils/dateFormats";

const UpdateSpecificUsers = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState("");
  let token = localStorage.getItem("token");
  let params = useParams();

  let navigate = useNavigate();

  let genderOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,

      dob: dob,
      gender: gender,
    };

    try {
      let result = await axios({
        url: `${url}/web/${params.id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/admin/${params.id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  let getUserData = async () => {
    try {
      let result = await axios({
        url: `${url}/web/${params.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = result.data.result;
      setDob(data.dob);
      setFullName(data.fullName);
      setGender(data.gender);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="fullName">Full Name: </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="dob">Dob: </label>
            <input
              type="date"
              id="dob"
              value={htmlDateFormat(dob)}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Gender: </label>
            <br />

            {genderOption.map((item, i) => {
              return (
                <div key={i}>
                  <label htmlFor={item.value}>
                    <input
                      type="radio"
                      id={item.value}
                      value={item.value}
                      checked={gender === item.value}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <button type="submit">Update user</button>
        </div>
      </form>
    </>
  );
};

export default UpdateSpecificUsers;
