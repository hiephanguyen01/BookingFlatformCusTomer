import { combineReducers } from "redux";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";

const rootReducer = combineReducers({
  postDaoReducer,modalReducer
});

export default rootReducer;
