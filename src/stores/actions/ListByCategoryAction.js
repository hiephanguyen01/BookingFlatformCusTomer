import {
  GET_LIST_BY_CATEGORY,
  SET_CATEGORY,
  SET_LINK_TO,
} from "../types/ListByCategoryTypes";

export const getListByCategory = (category) => {
  return async (dispatch) => {
    try {
      // const { data } = await listByCategory.getListByCategory("");
      let temp = [];
      dispatch({
        type: GET_LIST_BY_CATEGORY,
        data: temp,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_CATEGORY,
        data: category,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setLinkTo = (linkTo) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LINK_TO,
        data: linkTo,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
