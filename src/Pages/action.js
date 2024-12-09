import { toast } from "react-toastify";
import { api, apiEndPoints } from "../api";

export const POST_SIGNUP_API = "POST_SIGNUP_API";
export const POST_SIGNIN_API = "POST_SIGNIN_API";

const signUp = (payload) => {
  payload?toast.success("Signup successful"):toast.error("Signup failed")
  return {
    type: POST_SIGNUP_API,
    payload: payload,
  };
};
const signIn = (payload) => {
  localStorage.setItem("token", JSON.stringify(payload?.data.token));
  payload?toast.success("Login successful"):toast.error("Login failed");
  return {
    type: POST_SIGNIN_API,
    payload: payload?.data.User,
  };
};

export const postSignUpAPI = (payload,navigate) => async (dispatch) => {
  try {
    const response = await api.post(apiEndPoints.postSignUp(), payload);
    dispatch(signUp(response?.data));
    if(response?.data){
      navigate("/login",{state:{isSignIn:true}});
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};
export const postSignInAPI = (payload,navigate) => async (dispatch) => {
  try {
        const response = await api.post(apiEndPoints.postSignIn(), payload);
    dispatch(signIn(response?.data));
        if(response?.data){
      navigate("/dashboard")
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const sendMail = (payload) => async (dispatch) => {
  try {
    const response = await api.post(apiEndPoints.sendMail(), payload);
    if (response.data.status === "success") {
      toast.success("mail Sent successfully")
    }
    return response?.data;
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    const response = await api.get(apiEndPoints.getUser());
    dispatch(test(response?.data.data));
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};
const test = (payload) =>{
  return {
    type: POST_SIGNIN_API,
    payload: payload,
  };
}