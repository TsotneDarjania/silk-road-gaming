import React, { useState, useEffect } from "react";
import { deleteCookies, getCookie } from "./helper/cookie";

import "./index";

import { Intro } from "./pages/intro/Intro";
import { HomeMenu } from "./pages/homeMenu/HomeMenu";
import TransitionAnimation from "./components/Transition";
import HomePage from "./pages/homePage/HomePage";

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkIfLogin();
  }, []);

  const checkIfLogin = () => {
    if (getCookie("loginSession") !== "") {
      const userName = JSON.parse(getCookie("loginSession")).userName;
      const userPassword = JSON.parse(getCookie("loginSession")).password;

      fetch("http://localhost:3000/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({
          userName: userName,
          userPassword: userPassword,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.statusCode === 1 && setIsLogin(true);
          data.statusCode === 0 && deleteCookies();
          setIsLoading(false);
        });
    } else {
      deleteCookies();
      setIsLoading(false);
    }
  };

  const [page, setPage] = useState("intro");
  const [requestedPage, setRequestedPage] = useState("");

  const transitionAnimationAction = () => {
    setPage(requestedPage);
  };

  const [isTransitionPlayAnimation, setTransitionPlayAnimation] =
    useState(false);
  
  return (
    <div className="App">
      {page === "intro" && (
        <Intro
          setRequestedPage={setRequestedPage}
          setTransitionPlayAnimation={setTransitionPlayAnimation}
        />
      )}
      {page === "homeMenu" && (
        <HomeMenu
          setRequestedPage={setRequestedPage}
          setTransitionPlayAnimation={setTransitionPlayAnimation}
        />
      )}
      {page === "homePage" && (
        <HomePage
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setRequestedPage={setRequestedPage}
          setTransitionPlayAnimation={setTransitionPlayAnimation}
        />
      )}

      <TransitionAnimation
        isTransitionPlayAnimation={isTransitionPlayAnimation}
        setTransitionPlayAnimation={setTransitionPlayAnimation}
        transitionAnimationAction={transitionAnimationAction}
      />
    </div>
  );
}

export default App;
