
import {NEW_MESS} from '../type/messType'


const initState = {
  newMess: null,
}
export const messReducer = (state = initState, action ) => {
  switch (action.type) {
    case NEW_MESS:
      return {
        ...state,
        newMess: action.payload,
      }
    default:
      return state
  }
}
