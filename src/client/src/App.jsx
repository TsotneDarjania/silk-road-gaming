import React, { useState } from "react";
import MainPage from "./MainPage";
import UserContext from "./context/UserContext";
import PageContext from "./context/PageContext";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [requestedPage, setRequestedPage] = useState("");
  const [warningProps, setWarningProps] = useState({
    text: '',
    show: false
  })

  return (
    <PageContext.Provider value={{requestedPage, setRequestedPage, warningProps, setWarningProps}}>
      <UserContext.Provider
        value={{ userName, setUserName, isLogin, setIsLogin }}
      >
        <MainPage />
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
