const initialState = {
    ratingStudioPostDetai:[]
}

export const ratingReducer =  (state = initialState, action) => {
  switch (action.type) {

  case "first":
    return { ...state,  }

  default:
    return state
  }
}
