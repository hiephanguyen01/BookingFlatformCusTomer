import { combineReducers } from "redux";
import { authenticateReducer } from "./AuthenticateReducer";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";
<<<<<<< HEAD
import {phoneNumberReducer} from "./PhoneNumberReducer"
const rootReducer = combineReducers({
  postDaoReducer,
  phoneNumberReducer
=======
import { studioPostReducer } from "./StudioPostReducer";

const rootReducer = combineReducers({
  postDaoReducer,
  modalReducer,
  authenticateReducer,
  studioPostReducer,
>>>>>>> 6cdae3901c1e1a8aa7895d78f81573bfdfa92149
});

export default rootReducer;
