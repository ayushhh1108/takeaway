import { combineReducers } from "redux";
import Reducer from "../Pages/reducer";

const createReducer = () => {
  const rootReducer = combineReducers({
    Reducer: Reducer,
  });
  return rootReducer;
};

export default createReducer;
