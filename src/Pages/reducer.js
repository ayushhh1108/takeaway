import { isNotthenSecondParameter } from "../utils/helper";

const initialState = {
  AccountData: {},
  menuData: null,
  Categories: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_SIGNIN_API":
      return {
        ...state,
        AccountData: action.payload,
      };
    case "GET_MENU_DATA":
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
      return {
        ...state,
        loader: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};

export default Reducer;
