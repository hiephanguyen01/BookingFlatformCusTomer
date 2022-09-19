import { GET_ALL_NUMBER_RATE, GET_ALL_RATING_STUDIO } from "../types/rateType";

const initialState = {
  ratingStudioPostDetai: [],
  numberRating: [],
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RATING_STUDIO:
      return { ...state, ratingStudioPostDetai: action.data };
    case GET_ALL_NUMBER_RATE:
      return { ...state, numberRating: action.data };

    default:
      return state;
  }
};
