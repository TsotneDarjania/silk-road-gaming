import "./mysqlConfig";

import { db } from "./mysqlConfig";

export function registration(userName: string, password: string, res: any) {
  //Check if user already existed
  db.query(
    "SELECT * FROM users WHERE name = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        return { err: err };
      }
      if (result.length > 0) {
        res.send({
          responseMessage: "This Username is already Used",
          statusCode: 2,
          statusMessage: "Warned",
        });
      } else {
        insertNewUser(userName, password, res);
      }
    }
  );
}

export function saveGame(
  userName: string,
  gameName: string,
  data: any,
  res: any
) {
  const saveZoneIndex = data.saveZoneIndex;

  db.query(
    "UPDATE " + gameName + " SET saveZoneIndex = ? WHERE user = ?",
    [saveZoneIndex, userName],
    (err) => {
      if (err) {
        console.log(err);
        res.send({
          responseMessage: "query string is not correct",
          statusCode: -2,
          statusMessage: "Query Error",
        });
        return { err: err };
      }
      res.send({
        responseMessage: "Game Is Saved",
        statusCode: 1,
        statusMessage: "Success",
      });
    }
  );
}

export function getGameData(userName: string, gameName: string, res: any) {
  db.query(
    "SELECT * FROM " + gameName + "  WHERE user = ?",
    [userName],
    (err, result) => {
      if (err) {
        res.send({
          responseMessage: "query string is not correct",
          statusCode: -2,
          statusMessage: "Query Error",
        });
        return { err: err };
      }
      if (result.length <= 0) {
        res.send({
          responseMessage: "this user has not found",
          statusCode: 2,
          statusMessage: "Warned",
        });
      } else {
        res.send({
          saveZondeIndex: result[0].saveZoneIndex,
        });
      }
    }
  );
}

export function registrationInGame(
  userName: string,
  gameName: string,
  res: any
) {
  db.query(
    "SELECT * FROM " + gameName + "  WHERE user = ?",
    [userName],
    (err, result) => {
      if (err) {
        res.send({
          responseMessage: "server error",
          statusCode: -2,
          statusMessage: "Query Error",
        });
        return { err: err };
      }
      if (result.length > 0) {
        res.send({
          responseMessage: "This Username is already registered in this game",
          statusCode: 2,
          statusMessage: "Warned",
        });
      } else {
        insertNewUserInGame(userName, gameName, res);
      }
    }
  );
}

function insertNewUserInGame(userName: string, gameName: string, res: any) {
  db.query(
    "INSERT INTO " + gameName + " (user, saveZoneIndex) VALUES(?,?)",
    [userName, 0],
    (err, result) => {
      if (err) {
        res.send({
          responseMessage: "Server Error",
          statusCode: -1,
          statusMessage: "Failed",
        });
      }
      if (result) {
        res.send({
          responseMessage: "New user is Inserted in the game",
          statusCode: 1,
          statusMessage: "Success",
        });
      }
    }
  );
}

export function login(userName: string, password: string, res: any) {
  db.query(
    "SELECT * FROM users WHERE name = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send({
          responseMessage: "loginData is Correct",
          statusCode: 1,
          statusMessage: "Access",
        });
      } else {
        res.send({
          responseMessage: "loginData is Wrong",
          statusCode: 0,
          statusMessage: "Denied",
        });
      }
    }
  );
}

function insertNewUser(userName: string, password: string, res: any) {
  db.query(
    "INSERT INTO users (name, password) VALUES(?,?)",
    [userName, password],
    (err, result) => {
      if (err) {
        res.send({
          responseMessage: "Server Error",
          statusCode: -1,
          statusMessage: "Failed",
        });
      }
      if (result) {
        res.send({
          responseMessage: "New user is Inserted",
          statusCode: 1,
          statusMessage: "Success",
        });
      }
    }
  );
}
