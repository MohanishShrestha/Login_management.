import React, { createContext, useContext, useState } from "react";
import MyNavLink from "./component/MyNavLink";
import MyRoutes from "./component/MyRoutes";
import Parent from "./component/LearnContext/Parent";

// export let Context1 = createContext();
export let GlobalVariableContext = createContext();

const App = () => {
  // let [name, setName] = useState("Ram");
  // let [age, setAge] = useState("22");
  // let token = localStorage.getItem("token")
  let [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div>
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <MyNavLink />
        <MyRoutes />
      </GlobalVariableContext.Provider>

      {/* <Context1.Provider
        value={{ name: name, age: age, setAge: setAge, setName: setName }}
      >
        <Parent />
      </Context1.Provider> */}
    </div>
  );
};

export default App;
