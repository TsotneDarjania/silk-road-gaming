import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";
import HomePageInterface from "./components/homePagelnterface/HomePageInterface";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const HomePage = ({
  setRequestedPage,
  setTransitionPlayAnimation,
}) => {

  const userContext = useContext(UserContext)

  return (
    <div className={style.homePage}>
      {userContext.isLogin === false ? (
        <LoginAndRegistrationForm/>
      ) : (
        <HomePageInterface />
      )}
      <button
        onClick={() => {
          setTransitionPlayAnimation(true);
          setRequestedPage("homeMenu");
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
