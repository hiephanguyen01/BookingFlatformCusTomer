import { UPDATE_SCROLL } from '../type/messType'

const initState= {
  update:false
}
export const UpdateMReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_SCROLL:
      return {
        ...state,
        update: !state.update,
      }
    default:
      return state
  }
}