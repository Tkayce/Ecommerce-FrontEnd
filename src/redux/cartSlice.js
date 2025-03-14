import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
  loading: false,
  error: null,
};

const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`https://localhost:44329/api/Product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Fetch Product Error for ID ${productId}:`, error);
    return null;
  }
};
export const fetchCart = createAsyncThunk("cart/fetchCart", async (customerId, { rejectWithValue }) => {
  if (!customerId) {
    console.error("❌ fetchCart Error: customerId is undefined!");
    return rejectWithValue("Invalid customer ID");
  }

  try {
    const response = await axios.get(`https://localhost:44329/api/Cart/${customerId}?_=${new Date().getTime()}`);
    const cartData = response.data;

    if (!cartData || !cartData.cartItems) {
      return rejectWithValue("Invalid cart data");
    }

    const cartItemsWithDetails = await Promise.all(
      cartData.cartItems.map(async (item) => {
        const productDetails = await fetchProductDetails(item.productId);
        return productDetails
          ? { ...item, name: productDetails.name, imageUrl: productDetails.imageUrl }
          : item;
      })
    );

    return { ...cartData, cartItems: cartItemsWithDetails };
  } catch (error) {
    console.error("❌ Fetch Cart Error:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ customerId, productId, quantity }, { rejectWithValue }) => {
  if (!customerId) {
    console.error("❌ Add to Cart Error: customerId is undefined!");
    return rejectWithValue("Invalid customer ID");
  }

  try {
    const response = await axios.post(`https://localhost:44329/api/Cart/add`, {
      customerId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Add to Cart Error:", error);
    return rejectWithValue(error.response?.data || "Failed to add item to cart");
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ customerId, productId }, { rejectWithValue }) => {
  try {
    await axios.delete(`https://localhost:44329/api/Cart/delete/${customerId}/${productId}`);
    return productId;
  } catch (error) {
    console.error("❌ Remove from Cart Error:", error);
    return rejectWithValue(error.response?.data || "Failed to remove item");
  }
});

export const updateQuantity = createAsyncThunk("cart/updateQuantity", async ({ customerId, productId, quantity }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://localhost:44329/api/Cart/update`, {
      customerId,
      productId,
      quantity,
    });
    return { productId, quantity };
  } catch (error) {
    console.error("❌ Update Quantity Error:", error);
    return rejectWithValue(error.response?.data || "Failed to update quantity");
  }
});

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://localhost:44329/api/Cart/clear/${customerId}`);
      console.log("✅ Clear Cart API Response:", response.data);  // Log response
      return [];
    } catch (error) {
      console.error("❌ Clear Cart Error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems?.length ? action.payload.cartItems : [];
        state.loading = false;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); 
      })      
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const item = state.cartItems.find(item => item.productId === action.payload.productId);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(clearCart.fulfilled, (state) => {
        console.log("✅ Cart cleared successfully!");
        state.cartItems = [];
        localStorage.removeItem("cartItems");
      });
  },
});

export default cartSlice.reducer;

