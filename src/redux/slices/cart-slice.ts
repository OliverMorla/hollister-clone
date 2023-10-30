import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "0",
      price: 0,
      quantity: 0,
      name: "",
      size: "",
      cartPhoto: "",
      color: "",
    },
  ],
  totalQuantity: 0,
  changed: false,
};

if (typeof window !== "undefined") {
  initialState.items = JSON.parse(localStorage.getItem("cart") || "[]");
}

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
        color: string;
      }>
    ) => {
      if (
        action.payload.name !== "" &&
        action.payload.size !== "" &&
        action.payload.cartPhoto !== "" &&
        action.payload.color !== "" &&
        action.payload.price !== 0
      ) {
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
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      } else {
        alert("Please select a size and color");
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
