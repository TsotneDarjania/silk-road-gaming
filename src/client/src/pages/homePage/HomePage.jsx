import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";
import HomePageInterface from "./components/homePagelnterface/HomePageInterface";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import PageContext from "../../context/PageContext";

const HomePage = () => {

  const userContext = useContext(UserContext)
  const pageContext = useContext(PageContext)

  return (
    <div className={style.homePage}>
      {userContext.isLogin === false ? (
        <LoginAndRegistrationForm/>
      ) : (
        <HomePageInterface />
      )}
      <button
        onClick={() => {
          pageContext.setRequestedPage("homeMenu")
        }}
        type="button"
        className={style.backButton}
      >
        Back
      </button>
    </div>
  );
};

export default HomePage;
