import {
  ONLINE_USER,
  OFFLINE_USER,
  ONLINE_PARTNER,
  OFFLINE_PARTNER,
} from "../types/OnlineTypes";
const initState = {
  userList: [],
  partnerList: [],
  adminList: [],
};
export const OnlineReducer = (state = initState, action) => {
  switch (action.type) {
    case ONLINE_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case OFFLINE_USER:
      return {
        ...state,
        userList: action.payload,
      };
    case ONLINE_PARTNER:
      return {
        ...state,
        partnerList: action.payload,
      };
    case OFFLINE_PARTNER:
      return {
        ...state,
        partnerList: action.payload,
      };
    case "ONLINE_ADMIN":
      if (Object.keys(action.payload).length > 0) {
        let flag = 0;
        state.adminList.forEach((el) => {
          if (Object.values(action.value).includes(el)) {
            flag = 1;
          }
        });
        if (flag) {
          return;
        }
      }
      return {
        ...state,
        adminList: action.payload,
      };
    case "OFFLINE_ADMIN":
      return {
        ...state,
        adminList: action.payload,
      };
    default:
      return state;
  }
};
