const initialState = {
    items: [],
    totalAmount: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          items: [...state.items, action.payload],
        };
  
      case "REMOVE_ITEM":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload), // Remove item
        };
  
      case "UPDATE_QUANTITY":
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  