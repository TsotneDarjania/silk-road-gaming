import React, { useState, useEffect, useContext } from "react";
import { deleteCookies, getCookie, setCookie } from "./helper/cookie";
import "./index";
import { Intro } from "./pages/intro/Intro";
import { HomeMenu } from "./pages/homeMenu/HomeMenu";
import TransitionAnimation from "./components/transition/Transition";
import HomePage from "./pages/homePage/HomePage";
import { Api } from "./api/api";
import UserContext from "./context/UserContext";
import PageContext from "./context/PageContext";

const api = new Api();

function MainPage() {
  const userContext = useContext(UserContext);

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
            userContext.setIsLogin(true);
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

  const pageContext = useContext(PageContext);

  const transitionAnimationAction = () => {
    setPage(pageContext.requestedPage);
  };

  const [isTransitionPlayAnimation, setTransitionPlayAnimation] =
    useState(false);

  useEffect(() => {
    pageContext.requestedPage !== "" && setTransitionPlayAnimation(true);
  }, [pageContext.requestedPage]);

  return (
    <div className="App">
      {page === "intro" && <Intro />}
      {page === "homeMenu" && <HomeMenu />}
      {page === "homePage" && <HomePage />}
      {isTransitionPlayAnimation && (
        <TransitionAnimation
          setTransitionPlayAnimation={setTransitionPlayAnimation}
          transitionAnimationAction={transitionAnimationAction}
        />
      )}
    </div>
  );
}

export default MainPage;
