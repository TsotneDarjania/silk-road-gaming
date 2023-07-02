import React, { useState } from "react";
import MainPage from "./MainPage";
import UserContext from "./context/UserContext";
import PageContext from "./context/PageContext";

function App() {
  //User Context
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userAvatar, setUserAvatar] = useState(false);
  const [userRating, setUserRating] = useState(false);

  //Page Context
  const [requestedPage, setRequestedPage] = useState("");
  const [warningProps, setWarningProps] = useState({
    text: "",
    show: false,
  });
  const [isShowTransitionAnimation, setIsShowTransitionAnimation] =
    useState(false);

  return (
    <PageContext.Provider
      value={{
        requestedPage,
        setRequestedPage,
        warningProps,
        setWarningProps,
        isShowTransitionAnimation,
        setIsShowTransitionAnimation,
      }}
    >
      <UserContext.Provider
        value={{
          userName,
          setUserName,
          isLogin,
          setIsLogin,
          userAvatar,
          setUserAvatar,
          userRating,
          setUserRating,
        }}
      >
        <MainPage />
      </UserContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
