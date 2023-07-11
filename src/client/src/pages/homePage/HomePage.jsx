import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";
import HomePageInterface from "./components/homePagelnterface/HomePageInterface";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const HomePage = ({setPage}) => {

  const userContext = useContext(UserContext)

  return (
    <div className={style.homePage}>
      {userContext.isLogin === false ? (
        <LoginAndRegistrationForm/>
      ) : (
        <HomePageInterface />
      )}
      <PrimaryButton type='back' setPage={setPage}/>
    </div>
  );
};

export default HomePage;
