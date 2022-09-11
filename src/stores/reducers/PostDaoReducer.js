import {
  GET_LIST_POST,
  GET_DETAIL_POST,
  GET_PAGINATE_POSIBILITY,
  SELECT_RESULT,
  REMOVE_RESULT,
} from "../types/PostDaoType";
const initialState = {
  listPost: [],
  pagination: {},
  postDetail: {},
  selectSearch: [],
};
export const postDaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return { ...state, listPost: action.data };
    case GET_DETAIL_POST:
      return { ...state, postDetail: action.data };
    case GET_PAGINATE_POSIBILITY:
      return { ...state, pagination: action.data };
    case SELECT_RESULT:
      const selectSearchUpdate = [...state.selectSearch];
      const index = selectSearchUpdate.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        const newResult = {
          ...action.payload,
        };
        selectSearchUpdate.push(newResult);
      } else {
        selectSearchUpdate.splice(index, 1);
      }
      return { ...state, selectSearch: selectSearchUpdate };
    case REMOVE_RESULT: {
      const selectSearchUpdate = [...state.selectSearch];
      const index = selectSearchUpdate.findIndex(
        (item) => (item.id = action.payLoad.id)
      );
      selectSearchUpdate.splice(index, 1);
      return { ...state, selectSearch: selectSearchUpdate };
    }
    case GET_LIST_POST:
      return { ...state, listPost: action.data };
    default:
      return state;
  }
};

