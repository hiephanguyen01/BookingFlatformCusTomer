import { roomService } from "../../services/RoomService";
import { GET_DETAIL_ROOM } from "../types/RoomType";

export const getDetailRoomAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await roomService.getDetailRoom(id);
      dispatch({ type: GET_DETAIL_ROOM, data });
    } catch (error) {
      console.log(error);
    }
  };
};
