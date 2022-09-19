import { GET_DETAIL_ROOM, SET_SELECT_ROOM } from "../types/RoomType";

const initialState = {
  roomDetail: [],
  roomSelect:[]
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_ROOM:
      return { ...state, roomDetail: action.data };
    case SET_SELECT_ROOM:
        const selectSearchUpdate = [...state.roomSelect];
        const index = selectSearchUpdate.findIndex(
          (item) => item.id === action.data.id
        );
        if (index === -1) {
          const newResult = {
            ...action.data,
          };
          selectSearchUpdate.push(newResult);
        } else {
          selectSearchUpdate.splice(index, 1);
        }
        return { ...state, roomSelect: selectSearchUpdate };

    default:
      return state;
  }
};
