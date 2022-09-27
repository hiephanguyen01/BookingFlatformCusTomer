import {
  CANCEL_SAVED_POST,
  SET_LOADING,
  SET_SAVED_POST_LIST,
} from "../types/userTypes";

const initialState = {
  loading: false,
  savedPostList: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_SAVED_POST_LIST:
      return {
        ...state,
        savedPostList: action.payload,
      };
    case CANCEL_SAVED_POST:
      const newState = { ...state };
      const checkPost = newState.savedPostList.filter(
        (item) => item.Id === Number(action.payload.postId)
      );

      if (checkPost.length > 0) {
        return {
          ...newState,
          savedPostList: newState.savedPostList.filter(
            (item) => item.Id !== Number(action.payload.postId)
          ),
        };
      }
      return {
        ...newState,
      };

    default:
      return state;
  }
};
