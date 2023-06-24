import React, { useState, useReducer, useRef } from "react";
import Warning from "../../../../components/Warning";
import { deleteCookies, setCookie } from "../../../../helper/cookie";
import style from "./loginAndRegistrationForm.module.css";
import { Api } from "../../../../api/api";

const api = new Api();

const LoginAndRegistrationForm = ({ setIsLogin }) => {
  const userLoginNameRef = useRef(null);
  const userLoginPasswordRef = useRef(null);
  const userRegistrationNameRef = useRef(null);
  const userRegistrationPassowrdRef = useRef(null);

  const [showWarning, setShowWarning] = useState(false);
  const [showWarningText, setShowWarningText] = useState("");

  const login = (event) => {
    const userName = userLoginNameRef.current.value;
    const userPassword = userLoginPasswordRef.current.value;

    if (isValidation(userName, userPassword)) {
      api.userLogin(userName, userPassword).then(
        (response) => {
          if (response.password === userPassword) {
            saveUserIntoCookie(userName, userPassword);
            setIsLogin(true);
          } else {
            setShowWarning(true);
            setShowWarningText("Username or password is incorrect");
          }
        },
        (error) => {
          if (error.code === 404) {
            setShowWarning(true);
            setShowWarningText("Username or password is incorrect");
          }
        }
      );
    }
    event.preventDefault();
  };

  const isValidation = (userName, password) => {
    if (userName.length < 3) {
      setShowWarning(true);
      setShowWarningText("Your Username must have a minimum of 3 characters.");
      return false;
    }
    if (password.length < 3) {
      setShowWarning(true);
      setShowWarningText("Your Password must have a minimum of 3 characters.");
      return false;
    }
    return true;
  };

  const registration = (event) => {
    const userName = userRegistrationNameRef.current.value;
    const userPassword = userRegistrationPassowrdRef.current.value;

    if (isValidation(userName, userPassword)) {
      api.userRegistration(userName, userPassword).then(
        (response) => {
          saveUserIntoCookie(userName, userPassword);
          setIsLogin(true);
        },
        (error) => {
          if (error.code === 409) {
            setShowWarning(true);
            setShowWarningText(
              "This username already exists, please try another"
            );
          }
        }
      );
    }
    event.preventDefault();
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

  return (
    <div className={style.loginAndRegistrationForm}>
      {showWarning && (
        <Warning okState={setShowWarning} text={showWarningText} />
      )}

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
          <button onClick={login} type="button" className={style.submitButton}>
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
            onClick={registration}
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

export default LoginAndRegistrationForm;
