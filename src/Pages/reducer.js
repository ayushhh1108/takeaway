import { isNotthenSecondParameter } from "../utils/helper";

const initialState = {
  AccountData: {},
  menuData: null,
  Categories: null,
  loader: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_SIGNIN_API":
      return {
        ...state,
        AccountData: action.payload,
      };
    case "GET_MENU_DATA":
      console.log("action.payload?.data?.data", action.payload?.data?.data);
      return {
        ...state,
        menuData: isNotthenSecondParameter(action.payload?.data?.data, []),
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        Categories: action.payload,
      };
    case "SET_LOADING":
      console.log("Loader set to true");
      return { ...state, loader: true };

    case "STOP_LOADING":
      console.log("Loader set to false");
      return { ...state, loader: false };

    default:
      return state;
  }
};

export default Reducer;
