import { combineReducers } from "redux";
import { postDaoReducer } from "./PostDaoReducer";

const rootReducer = combineReducers({
  postDaoReducer,
});

export default rootReducer;
