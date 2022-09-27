import { combineReducers } from "redux";
import { authenticateReducer } from "./AuthenticateReducer";
import { modalReducer } from "./ModalReducer";
import { postDaoReducer } from "./PostDaoReducer";
import { studioPostReducer } from "./StudioPostReducer";
import { listByCategoryReducer } from "./ListByCategoryReducer";
import { roomReducer } from "./RoomReducer";
import { ratingReducer } from "./RatingReducer";
import { promoCodeReducer } from "./PromoCodeReducer";
import { topOrderCategoryReducer } from "./TopOrderCategotyReducer";

import { OnlineReducer } from "./OnlineReducer";
import { chatReducer } from "./ChatReducer";
import { OrderReducer } from "./OrderReducer";
import { userReducer } from "./UserReducer";
const rootReducer = combineReducers({
  postDaoReducer,
  modalReducer,
  authenticateReducer,
  studioPostReducer,
  listByCategoryReducer,
  roomReducer,
  ratingReducer,
  promoCodeReducer,
  OnlineReducer,
  chatReducer,
  topOrderCategoryReducer,
  OrderReducer,
  userReducer,
});

export default rootReducer;
