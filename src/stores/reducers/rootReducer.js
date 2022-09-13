import { combineReducers } from "redux";
import { authenticateReducer } from "./AuthenticateReducer";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";
import { studioPostReducer } from "./StudioPostReducer";
import { listByCategoryReducer } from "./ListByCategoryReducer";

import {OnlineReducer} from "./OnlineReducer"
import { chatReducer } from "./ChatReducer";
const rootReducer = combineReducers({
  postDaoReducer,
  modalReducer,
  authenticateReducer,
  studioPostReducer,
  listByCategoryReducer,
  OnlineReducer,
  chatReducer

});

export default rootReducer;
