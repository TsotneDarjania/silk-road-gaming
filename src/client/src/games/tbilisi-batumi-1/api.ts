import { getCookie } from "../../helper/cookie";

const loginSession = getCookie("loginSession");

export class API {
  userName: string = "";
  userPassword: string = "";

  constructor() {
    if (loginSession.length > 3) {
      this.userName = JSON.parse(loginSession).userName;
      this.userPassword = JSON.parse(loginSession).password;
    }
  }

  init() {
    return fetch("http://localhost:3000/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        userPassword: this.userPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  sendLoginRequset(username: string, password: string) {
    return fetch("http://localhost:3000/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        userPassword: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  sendRegistrationRequest(username: string, password: string) {
    return fetch("http://localhost:3000/user-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        userPassword: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
