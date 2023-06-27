import LoginAndRegistrationForm from "./components/loginAndRegistrationForm/LoginAndRegistrationForm";
import style from "./homePage.module.css";
import HomePageInterface from "./components/homePagelnterface/HomePageInterface";

const HomePage = ({
  isLogin,
  setIsLogin,
  setRequestedPage,
  setTransitionPlayAnimation,
}) => {
  return (
    <div className={style.homePage}>
      {isLogin === false ? (
        <LoginAndRegistrationForm setIsLogin={setIsLogin} />
      ) : (
        <HomePageInterface setIsLogin={setIsLogin} />
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
