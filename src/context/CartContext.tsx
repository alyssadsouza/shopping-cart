import { createContext, useContext, ReactNode, useState } from "react";
import type {Item} from '../components/Item';

import storeItems from "../data/items.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  getCartItemsFromStore: () => Item[];
  cartQuantity: number;
  getCartTotal: () => number;
};

type CartItem = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useShoppingCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);
  
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  function getCartItemsFromStore() {
    return storeItems.filter(item => cartItems.map(cartItem => cartItem.id)?.includes(item.id)) || [];
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((current) => {
      if (!getItemQuantity(id)) {
        return [...current, { id, quantity: 1 }]; // add item to cart since it doesn't exist
      }
      return current.map((item) => {
        if (item.id === id) {
          return { id, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((current) => {
      if (getItemQuantity(id) === 1) {
        // remove from cart since new quantity is 0
        return current.filter((item) => item.id !== id);
      }
      return current.map((item) => {
        if (item.id === id) {
          return { id, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }

  function removeFromCart(id: number) {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }

  function getCartTotal() {
    const cartTotal = getCartItemsFromStore().reduce((total, item) => item.price * getItemQuantity(item.id) + total, 0);
    return cartTotal;
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        getCartItemsFromStore,
        cartQuantity,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
