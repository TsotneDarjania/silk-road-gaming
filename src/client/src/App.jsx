import React, { useState, useEffect } from "react";
import { deleteCookies, getCookie, setCookie } from "./helper/cookie";
import "./index";
import { Intro } from "./pages/intro/Intro";
import { HomeMenu } from "./pages/homeMenu/HomeMenu";
import TransitionAnimation from "./components/Transition";
import HomePage from "./pages/homePage/HomePage";
import { Api } from "./api/api";

const api = new Api();

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

      api.userLogin(userName, userPassword).then(
        (response) => {
          if (response.password === userPassword) {
            saveUserIntoCookie(userName, userPassword);
            setIsLogin(true);
          } else {
            deleteCookies();
          }
        },
        (error) => {
          deleteCookies();
        }
      );
    }
  };

  const saveUserIntoCookie = (username, password) => {
    setCookie(
      "loginSession",
      JSON.stringify({
        userName: username,
        password: password,
      }),
      2100
    );
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
          isLogin={isLogin}
          setIsLogin={setIsLogin}
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
