"use client";
import { FC, createContext, useContext, useMemo, useState } from "react";
import { ICartContext } from "./types";
import CartService from "./cartService";

export interface ICartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<ICartContext>({
  items: [],
  count: 0,
  totalPrice: 0,
  addNewItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clear: () => {},
  isExist: () => false,
  find: () => undefined,
});

export const CartProvider: FC<ICartProviderProps> = ({ children }) => {
  const cartService = useMemo(() => new CartService(), []);
  [cartService.items, cartService.setItems] = useState(cartService.items);

  return (
    <CartContext.Provider
      value={{
        items: cartService.items,
        count: cartService.getItemsCount(),
        totalPrice: cartService.getTotalPrice(),
        addNewItem: cartService.addNewItem,
        removeItem: cartService.removeItem,
        updateQuantity: cartService.updateQuantity,
        clear: cartService.clear,
        isExist: cartService.isExist,
        find: cartService.find,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("Cart hook can not be used outside of a CartProvider.");
  }

  return cart;
};
