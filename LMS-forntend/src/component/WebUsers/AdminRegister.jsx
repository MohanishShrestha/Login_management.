import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../constant";

const AdminRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  let genderOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      email: email,
      password: password,
      dob: dob,
      gender: gender,
    };
    // console.log(data);
    data = {
      ...data,
      role: " ",
    };

    try {
      let result = await axios({
        url: `${url}/web`,
        method: "post",
        data: data,
      });

      setFullName("");
      setEmail("");
      setPasword("");
      setDob("");
      setGender("");
      console.log(result);
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
              type="text"
              id="password"
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="dob">Dob: </label>
            <input
              type="date"
              id="dob"
              value={dob}
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
          <button>Send</button>
        </div>
      </form>
    </>
  );
};

export default AdminRegister;
