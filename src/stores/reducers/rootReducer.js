import { combineReducers } from "redux";
import { postDaoReducer } from "./PostDaoReducer";
import {phoneNumberReducer} from "./PhoneNumberReducer"
const rootReducer = combineReducers({
  postDaoReducer,
  phoneNumberReducer
});

export default rootReducer;
