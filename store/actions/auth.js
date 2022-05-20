export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const REFRESH = "REFRESH";
export const LOGOUT = "LOGOUT";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Alert from "react-native";

import { auth } from "../../Firebase-config";

let timer;

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      dispatch({
        type: SIGNUP,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const refreshState = (userId, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REFRESH,
        token: token,
        userId: userId,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
      .then(() => {
        console.log("signed out");
        AsyncStorage.removeItem("userData");
        clearLogoutTimer();
        dispatch({ type: LOGOUT });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

      const respData = JSON.stringify(response);
      const jsonData = JSON.parse(respData);

      const userId = jsonData["user"]["uid"];

      const expiryDate = new Date(
        jsonData["user"]["stsTokenManager"]["expirationTime"]
      ).toISOString();

      const expirationTime =
        jsonData["user"]["stsTokenManager"]["expirationTime"] - new Date();

      saveDataToStorage(
        userId,
        jsonData["user"]["stsTokenManager"]["accessToken"],
        expiryDate
      );

      dispatch(setLogoutTimer(expirationTime));

      dispatch({
        type: LOGIN,
        token: jsonData["user"]["stsTokenManager"]["accessToken"],
        userId: userId,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};

const saveDataToStorage = (userId, token, expirationTIme) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      token: token,
      expirationTIme: expirationTIme,
    })
  );
};
