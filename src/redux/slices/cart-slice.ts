import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "0", price: 0, quantity: 0, name: "", size: "", cartPhoto: "" },
  ],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        price: number;
        name: string;
        quantity: number;
        size: string;
        cartPhoto: string;
      }>
    ) => {
      const doesItemExist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (doesItemExist) {
        state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity++;
          }
          return item;
        });
      } else {
        state.items.push({
          ...action.payload,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
