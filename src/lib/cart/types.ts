import { IProfile } from "@/app/order/_types";

export interface ICartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export type SetState<S = unknown> = (prev: S | ((prev: S) => S)) => void;

export interface ICartContext {
  /**
   * All items in cart.
   */
  items: ICartItem[];

  /**
   * Count for items in cart.
   */
  count: number;

  /**
   * Total price for cart.
   */
  totalPrice: number;

  /**
   * Add new item to cart.
   */
  addNewItem: (profile: IProfile) => void;

  /**
   * Remove an item from cart
   */
  removeItem: (item: IProfile) => void;

  /**
   * Update quantity for specific item
   */
  updateQuantity: (profile: IProfile, newQuantity: number) => void;

  /**
   * Use clear cart.
   */
  clear: () => void;
  /** check if the item already exists in cart*/
  isExist: (id: IProfile["id"]) => boolean;
  find: (id: IProfile["id"]) => ICartItem | undefined;
}
