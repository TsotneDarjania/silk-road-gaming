import { Api } from "../api/api";
import { setCookie } from "../helper/cookie";

const api = new Api();

export function isValidation(
  userName: string,
  password: string,
  setWarningProps: any
) {
  if (userName.length < 3) {
    setWarningProps({
      text: "Your Username must have a minimum of 3 characters.",
      show: true,
    });
    return false;
  }
  if (password.length < 3) {
    setWarningProps({
      text: "Your Password must have a minimum of 3 characters.",
      show: true,
    });
    return false;
  }
  return true;
}

export const saveUserIntoCookie = (username: string, password: string) => {
  setCookie(
    "loginSession",
    JSON.stringify({
      userName: username,
      password: password,
    }),
    2100
  );
};

export function login(
  username: string,
  password: string,
  setIsLogin: any,
  setWarningProps: any,
  accesAction: Function | undefined
) {
  api.userLogin(username).then(
    (response) => {
      if (response.password === password) {
        saveUserIntoCookie(username, password);
        setIsLogin(true);
        accesAction !== undefined && accesAction();
      } else {
        setWarningProps({
          text: "Username or password is incorrect",
          show: true,
        });
      }
    },
    (error) => {
      if (error.code === 404) {
        setWarningProps({
          text: "Username or password is incorrect",
          show: true,
        });
      }
    }
  );
}

export function registration(
  username: string,
  password: string,
  setIsLogin: any,
  setWarningProps: any,
  accesAction: Function | undefined
) {
  api.userRegistration(username, password).then(
    (response) => {
      saveUserIntoCookie(username, password);
      setIsLogin(true);
      accesAction !== undefined && accesAction();
    },
    (error) => {
      console.log(error.code);
      if (error.code === 409) {
        setWarningProps({
          text: "This username already exists, please try another",
          show: true,
        });
      }
    }
  );
}
