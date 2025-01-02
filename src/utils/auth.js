import LocalStorageManager from "./local-storage-manager";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  return LocalStorageManager?.isUserAvailable() ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export const RedirectToLink = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  return;
};

export const getToken = () => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  if (localStorageData) {
    const token = localStorageData?.token;
    return token;
  }
};

export const getLocalStorageData = (token) => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  return localStorageData;
  //   return SessionStorageManager.setSessionStorage(
  //     BEARER_TOKEN,
  //     `Bearer ${token}`
  //   );
};
export const setToken = (token) => {
  return LocalStorageManager.setLocalStorage("TOKEN", token);
  //   return SessionStorageManager.setSessionStorage(
  //     BEARER_TOKEN,
  //     `Bearer ${token}`
  //   );
};

export const removeBearerToken = () => {
  return LocalStorageManager.removeLocalStorage("BEARER_TOKEN");
};

export const logOut = () => {
  return LocalStorageManager.clearLocalStorage();
};

export const isAuthenticated = () => LocalStorageManager?.isUserAvailable();
