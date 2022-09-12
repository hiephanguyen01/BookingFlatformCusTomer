import { combineReducers } from "redux";
import { authenticateReducer } from "./AuthenticateReducer";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";
import { studioPostReducer } from "./StudioPostReducer";
import { listByCategoryReducer } from "./ListByCategoryReducer";
import { UpdateMReducer } from "../../components/Chat/redux/reducer/updateMReducer";
import { OnlineReducer } from "../../components/Chat/redux/reducer/OnlineReducer";
import { findConverReducer } from "../../components/Chat/redux/reducer/FindConverReducer";
const rootReducer = combineReducers({
  postDaoReducer,
  modalReducer,
  authenticateReducer,
  studioPostReducer,
  listByCategoryReducer,
  UpdateMReducer,
  OnlineReducer,
  findConverReducer,
});

export default rootReducer;
