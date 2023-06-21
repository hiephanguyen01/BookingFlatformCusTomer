import {
  SET_TOP_CLOTHES_POST,
  SET_TOP_DEVICE_POST,
  SET_TOP_MAKEUP_POST,
  SET_TOP_MODEL_POST,
  SET_TOP_ORDER_STUDIO_POST,
  SET_TOP_PHOTOGRAPHER_POST,
} from "../types/TopOrderCategoryPostType";

const initialState = {
  listOustandingStudioPost: [],
  listOustandingModelPost: [],
  listOustandingDevicePost: [],
  listOustandingClothesPost: [],
  listOustandingMakeupPost: [],
  listOustandingPhotographerPost: [],
};

export const topOrderCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOP_CLOTHES_POST:
      return { ...state, listOustandingClothesPost: action.data };
    case SET_TOP_DEVICE_POST:
      return { ...state, listOustandingDevicePost: action.data };
    case SET_TOP_MAKEUP_POST:
      return { ...state, listOustandingMakeupPost: action.data };
    case SET_TOP_MODEL_POST:
      return { ...state, listOustandingModelPost: action.data };
    case SET_TOP_ORDER_STUDIO_POST:
      return { ...state, listOustandingStudioPost: action.data };
    case SET_TOP_PHOTOGRAPHER_POST:
      return { ...state, listOustandingPhotographerPost: action.data };

    default:
      return state;
  }
};
