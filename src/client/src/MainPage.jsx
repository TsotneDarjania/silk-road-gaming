import { useState, useEffect, useContext } from "react";
import { deleteCookies, getCookie } from "./helper/cookie";
import "./index";
import { Intro } from "./pages/intro/Intro";
import { HomeMenu } from "./pages/homeMenu/HomeMenu";
import TransitionAnimation from "./components/transition/Transition";
import HomePage from "./pages/homePage/HomePage";
import { Api } from "./api/api";
import UserContext from "./context/UserContext";
import PageContext from "./context/PageContext";
import { saveUserIntoCookie } from "./utils/autenticationLogic";

const api = new Api();

function MainPage() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    checkIfLogin();
  }, [userContext.isLogin]);

  const checkIfLogin = () => {
    if (getCookie("loginSession") !== "") {
      const userName = JSON.parse(getCookie("loginSession")).userName;
      const userPassword = JSON.parse(getCookie("loginSession")).password;

      api.userLogin(userName, userPassword).then(
        (response) => {
          if (response.password === userPassword) {
            userContext.setUserName(response.name);
            userContext.setUserAvatar(response.avatar);
            userContext.setUserRating(response.rating);
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

  // const [page, setPage] = useState("intro");
  const [page, setPage] = useState("homeMenu")

  const pageContext = useContext(PageContext);

  // const transitionAnimationAction = () => {
  //   setPage(pageContext.requestedPage);
  // };

  return (
    <div className="App">
      {/* {page === "intro" && <Intro />} */}
      {page === "homeMenu" && <HomeMenu setPage={setPage}/>}
      {page === "homePage" && <HomePage setPage={setPage}/>}
      {/* {pageContext.isShowTransitionAnimation && (
        <TransitionAnimation
          transitionAnimationAction={transitionAnimationAction}
        />
      )} */}
    </div>
  );
}

export default MainPage;
