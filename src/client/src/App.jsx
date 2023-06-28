import React, { useState } from "react";
import MainPage from "./MainPage";
import UserContext from "./context/UserContext";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  return (
    <UserContext.Provider
      value={{ userName, setUserName, isLogin, setIsLogin }}
    >
      <MainPage />
    </UserContext.Provider>
  );
}

export default App;
