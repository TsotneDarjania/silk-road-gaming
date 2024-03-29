import { useRef, useContext } from "react";
import style from "./autentication.module.css";
import Warning from "../warning/Warning";
import "../../global.css";
import UserContext from "../../context/UserContext";
import PageContext from "../../context/PageContext";
import {
  isValidation,
  login,
  registration,
} from "../../utils/autenticationLogic";

const AuthenticationModal = ({ accessAction, setShowAutenticationModal }) => {
  const userLoginNameRef = useRef(null);
  const userLoginPasswordRef = useRef(null);
  const userRegistrationNameRef = useRef(null);
  const userRegistrationPassowrdRef = useRef(null);

  const pageContext = useContext(PageContext);
  const userContext = useContext(UserContext);

  const handleLogin = (event) => {
    const userName = userLoginNameRef.current.value;
    const userPassword = userLoginPasswordRef.current.value;

    if (isValidation(userName, userPassword, pageContext.setWarningProps)) {
      login(
        userName,
        userPassword,
        userContext.setIsLogin,
        pageContext.setWarningProps,
        accessAction()
      );
    }

    event.preventDefault();
  };

  const handleRegistration = (event) => {
    const userName = userRegistrationNameRef.current.value;
    const userPassword = userRegistrationPassowrdRef.current.value;

    if (isValidation(userName, userPassword, pageContext.setWarningProps)) {
      registration(
        userName,
        userPassword,
        userContext.setIsLogin,
        pageContext.setWarningProps,
        accessAction()
      );
    }
    event.preventDefault();
  };

  return (
    <div className={style.loginAndRegistrationForm}>
      {pageContext.warningProps.show && <Warning />}
      <div
        className="shadow"
        onClick={() => setShowAutenticationModal(false)}
      ></div>
      <div className={style.centerContainer}>
        <div className={style.formContainer}>
          <h3 className={style.formTitle}> Login </h3>
          <div className={style.userInputDiv}>
            <p className={style.userInputTitle}> Player Name </p>
            <input
              maxLength={20}
              ref={userLoginNameRef}
              className={style.userInput}
              type="text"
            />
          </div>
          <div className={style.userInputDiv}>
            <p className={style.userInputTitle}> Password </p>
            <input
              ref={userLoginPasswordRef}
              maxLength={20}
              className={style.userInput}
              type="password"
            />
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className={style.submitButton}
          >
            Login
          </button>
        </div>

        <div className={style.formContainer}>
          <h3 className={style.formTitle}> Registration </h3>
          <div className={style.userInputDiv}>
            <p className={style.userInputTitle}> Player Name </p>
            <input
              ref={userRegistrationNameRef}
              maxLength={20}
              className={style.userInput}
              type="text"
            />
          </div>
          <div className={style.userInputDiv}>
            <p className={style.userInputTitle}> Password </p>
            <input
              ref={userRegistrationPassowrdRef}
              maxLength={20}
              className={style.userInput}
              type="password"
            />
          </div>
          <button
            onClick={handleRegistration}
            type="button"
            className={style.submitButton}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;
