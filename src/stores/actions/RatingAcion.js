import { ratingService } from "../../services/RatingService";
import { GET_ALL_NUMBER_RATE, GET_ALL_RATING_STUDIO } from "../types/rateType";

export const getAllRatingStudioByIdAction = (id,numberRate) => {
  return async (dispatch) => {
    try {
      const { data } = await ratingService.getAllRateStudioById(id,numberRate);
      dispatch({ type: GET_ALL_RATING_STUDIO, data: data.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNumberRateStudioByIdAction = (id, numberRating) => {
  return async (dispatch) => {
    try {
      const { data } = await ratingService.getNumberRatingStuido(
        id,
        numberRating
      );
      const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
      const res = values.reduce((acc, curr) => {
        const index = data.findIndex((item) => item.Rate === curr.id);
        if (index > -1) {
          curr.total = data[index].total;
        } else {
          curr.total = 0;
        }

        acc.push(curr);
        return acc;
      }, []);
      dispatch({ type: GET_ALL_NUMBER_RATE, data: res.reverse() });
    } catch (error) {
      console.log(error);
    }
  };
};
