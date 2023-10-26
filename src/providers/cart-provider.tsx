"use client"
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CartProvider;
