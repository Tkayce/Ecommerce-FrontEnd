const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.id === action.payload.id);

      let updatedItems;
      if (existingItem) {
        // If item exists, update its quantity
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.items, { ...action.payload, quantity: action.payload.quantity }];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalAmount: filteredItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

    case "UPDATE_QUANTITY":
      const updatedQuantityItems = state.items.map(item =>
        item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
      );

      return {
        ...state,
        items: updatedQuantityItems,
        totalAmount: updatedQuantityItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

    default:
      return state;
  }
};

export default cartReducer;
