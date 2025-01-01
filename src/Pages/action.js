import { toast } from "react-toastify";
import { api, apiEndPoints } from "../api";
import axios, { Axios } from "axios";
import LocalStorageManager from "../utils/local-storage-manager";

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
      toast.info(`Temporary OTP is ${response?.data?.data?.otp}`);
      handleSendCode();
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const postOTPAPI =
  (payload, navigate, handleFail) => async (dispatch) => {
    try {
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
        // toast.success("Login successfully");
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

export const postOrderCreate =
  (payload, completeProcess, setOrderId) => async (dispatch) => {
    try {
      const response = await api.post(apiEndPoints.orderCreate(), payload);
      // dispatch(signUp(response?.data));
      if (response?.data) {
        console.log("payload", payload?.paymentMode === "cash");
        setOrderId(response?.data?.data?.id);

        payload?.paymentMode !== "cash"
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
        return;
      }
      const options = {
        key: process.env.REACT_APP_RAJORPAY_API_KEY, // Replace with your Razorpay Key ID
        amount: order.amount, // Amount in paisa
        currency: order.currency,
        name: "Takeaway Service",
        description: "Order Payment",
        order_id: order.id, // Razorpay order ID
        handler: async (response) => {
          // Step 3: Verify payment on the backend
          const verifyResponse = await api.post(
            apiEndPoints.verifyOrderPayment(),
            JSON.stringify({ ...response, orderId })
          );

          console.log("response?.data", verifyResponse);
          if (verifyResponse?.data?.data) {
            toast.success("Payment successful");
            completeProcess();
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name", // Prefill customer details
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
    } catch (error) {
      const { response: { data = {} } = {} } = error;
      return data;
    }
  };

export const getOrderData = (id) => async (dispatch) => {
  try {
    const response = await api.get(apiEndPoints.orderStatus(id));
    if (response?.data) {
      return response?.data?.data;
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const response = await api.get(
      apiEndPoints.getOrders(LocalStorageManager.getUserData()?.id)
    );
    if (response?.data) {
      return response?.data?.data;
    } else if (response?.response?.data?.message) {
      toast.error(response?.response?.data?.message);
    }
  } catch (error) {
    const { response: { data = {} } = {} } = error;
    return data;
  }
};
