import { toast } from "react-toastify";
import { api, apiEndPoints } from "../api";
import LocalStorageManager from "../utils/local-storage-manager";

export const GET_CATEGORIES = `GET_CATEGORIES`;
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";
export const GET_MENU_DATA = "GET_MENU_DATA";
export const CLEAR_MENU_DATA = "CLEAR_MENU_DATA";
export const SET_LOADING = "SET_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export const setLoading = () => ({ type: SET_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });
const getCategories = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload: payload.data.data,
  };
};

const getMenu = (payload) => {
  return {
    type: GET_MENU_DATA,
    payload: payload,
  };
};

export const postSignUpAPI = (payload, handleSendCode) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await api.post(apiEndPoints.postSignUp(), payload);
    if (response?.data) {
      toast.info(`Temporary OTP is ${response?.data?.data?.otp}`);
      handleSendCode();
    }
    dispatch(stopLoading());
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const postOTPAPI =
  (payload, navigate, handleFail) => async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await api.post(apiEndPoints.postOTPverify(), payload);
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
        navigate("/menu");
      }
      dispatch(stopLoading());
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      return data;
    }
  };

export const GetCategories = () => async (dispatch, getState) => {
  try {
    const response = await api.get(apiEndPoints.getCategories());
    dispatch(getCategories(response));
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const getMenuData = () => async (dispatch, getState) => {
  try {
    const response = await api.get(apiEndPoints.menuItems());
    if (response?.data) {
      dispatch(getMenu(response));
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const sendMail = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await api.post(apiEndPoints.sendMail(), payload);
    if (response.data.status === "success") {
      toast.success("Mail sent successfully");
    }
    dispatch(stopLoading());
    return response?.data;
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const postOrderCreate =
  (payload, completeProcess, setOrderId) => async (dispatch) => {
    try {
      const response = await api.post(apiEndPoints.orderCreate(), payload);
      // dispatch(signUp(response?.data));
      if (response?.data) {
        console.log("payload", payload?.paymentMode === "Cash");
        setOrderId(response?.data?.data?.id);

        payload?.paymentMode !== "Cash"
          ? dispatch(
              initiatePayment(
                response?.data?.data?.id,
                payload?.total,
                completeProcess
              )
            )
          : completeProcess();
        LocalStorageManager.clearCart();
      }
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      return data;
    }
  };

const createOrder = async (orderId, amount) => {
  try {
    const response = await api.post(
      apiEndPoints.createOrderPayment(),
      JSON.stringify({ orderId, amount })
    );

    return response?.data?.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const initiatePayment =
  (orderId, amount, completeProcess) => async (dispatch) => {
    try {
      const order = await createOrder(orderId, amount);

      if (!order) {
        console.error("Order creation failed");
        dispatch(stopLoading());
        return;
      }
      const options = {
        key: process.env.REACT_APP_RAJORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Takeaway Service",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await api.post(
            apiEndPoints.verifyOrderPayment(),
            JSON.stringify({ ...response, orderId })
          );
          if (verifyResponse?.data?.data) {
            toast.success("Payment successful");
            completeProcess();
          } else {
            toast.error("Payment verification failed");
          }
          dispatch(stopLoading());
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        notes: {
          address: "Takeaway Address",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed", response.error);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
      dispatch(stopLoading());
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      return data;
    }
  };

export const getOrderData = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await api.get(apiEndPoints.orderStatus(id));
    if (response?.data) {
      dispatch(stopLoading());
      return response?.data?.data;
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
    dispatch(stopLoading());
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await api.get(
      apiEndPoints.getOrders(LocalStorageManager.getUserData()?.id)
    );
    if (response?.data) {
      dispatch(stopLoading());
      return response?.data?.data;
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
    dispatch(stopLoading());
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};
