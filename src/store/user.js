const DEFAULT_STATE = {
  username: "",
  id: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dubState = { ...state };

    dubState.username = action.payload.username;
    dubState.id = action.payload.id;

    return dubState;
  }
  return state;
};
