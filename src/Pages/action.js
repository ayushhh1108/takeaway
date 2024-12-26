import { toast } from "react-toastify";
import { api, apiEndPoints } from "../api";
import axios, { Axios } from "axios";

export const GET_CATEGORIES = `GET_CATEGORIES`;
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";
export const GET_MENU_DATA = "GET_MENU_DATA";
export const CLEAR_MENU_DATA = "CLEAR_MENU_DATA";

const getCategories = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload: payload.data.data,
  };
};

const getMenu = (payload) => {
  console.log("hii", payload);
  return {
    type: GET_MENU_DATA,
    payload: payload,
  };
};

export const postSignUpAPI = (payload, handleSendCode) => async (dispatch) => {
  try {
    const response = await api.post(apiEndPoints.postSignUp(), payload);
    // dispatch(signUp(response?.data));
    if (response?.data) {
      handleSendCode();
    }
  } catch (error) {
    console.log(payload, "response", error);

    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const postOTPAPI =
  (payload, navigate, handleFail) => async (dispatch) => {
    try {
      const response = await api.post(apiEndPoints.postOTPverify(), payload);
      console.log("response", response?.response?.data?.message);
      if (response?.response?.data?.message) {
        toast.error(response?.response?.data?.message);
        handleFail(payload);
      }
      if (response?.data) {
        const data = {
          ...response?.data?.data?.user,
          token: response?.data?.data?.token,
        };
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successfully");
        navigate("/menu");
      }
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      return data;
    }
  };

export const GetCategories = () => async (dispatch) => {
  try {
    const response = await api.get(apiEndPoints.getCategories());
    dispatch(getCategories(response));
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const getMenuData = () => async (dispatch) => {
  try {
    const response = await api.get(apiEndPoints.menuItems());
    if (response?.data) {
      toast.success(response?.data?.message);
      dispatch(getMenu(response));
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
    console.log("response", response);
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const sendMail = (payload) => async (dispatch) => {
  try {
    const response = await api.post(apiEndPoints.sendMail(), payload);
    if (response.data.status === "success") {
      toast.success("mail Sent successfully");
    }
    return response?.data;
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

