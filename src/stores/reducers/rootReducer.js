import { combineReducers } from "redux";
import { authenticateReducer } from "./AuthenticateReducer";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";
import { studioPostReducer } from "./StudioPostReducer";

const rootReducer = combineReducers({
  postDaoReducer,
  modalReducer,
  authenticateReducer,
  studioPostReducer,
});

export default rootReducer;
