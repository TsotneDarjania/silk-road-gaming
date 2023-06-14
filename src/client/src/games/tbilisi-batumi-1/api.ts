import { getCookie } from "../../helper/cookie";
import { gameConfig } from "./config/gameConfig";

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
      .then(async (data) => {
        if (data.statusCode === 1) {
          await this.insertUserInGame();
          await this.getGameData();
        }
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  saveGame(saveZoneIndex: number) {
    return fetch("http://localhost:3000/save-game-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        gameName: "batumisken_version_1",
        data: {
          saveZoneIndex: saveZoneIndex,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getGameData() {
    return fetch("http://localhost:3000/get-game-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        gameName: "batumisken_version_1",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        gameConfig.saveZoneIndex = Number(response.saveZondeIndex);
        return response;
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

  insertUserInGame() {
    return fetch("http://localhost:3000/insert-user-in-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: this.userName,
        gameName: "batumisken_version_1",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response === 2) {
          gameConfig.saveZoneIndex = 0;
        }
        return response;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
