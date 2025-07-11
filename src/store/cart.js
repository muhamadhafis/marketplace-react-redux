const DEFAULT_STATE = {
  items: [],
};

export const cartReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "CART_GET") {
    const dubState = { ...state };

    dubState.items = action.payload;

    return dubState;
  }
  return state;
};
