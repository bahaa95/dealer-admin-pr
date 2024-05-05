"use client";
import { updateOne, deleteOne } from "@/utils";
import { ICartItem, SetState } from "./types";
import { IProfile } from "@/app/order/_types";

export default class CartService {
  // items state
  public items: ICartItem[] = [];
  public setItems: SetState<ICartItem[]> = null as any;

  /**
   * Return the number of items in cart.
   */
  public getItemsCount = (): number => {
    return this.items.length;
  };

  /**
   * Return the total price for items in cart.
   */
  public getTotalPrice = (): number => {
    const total = this.items.reduce((p, c) => {
      return (p += c.price * c.quantity);
    }, 0);

    return total;
  };

  /**
   * Add new item to cart.
   */
  public addNewItem = (profile: IProfile): void => {
    const quantity = 1;
    const totalPrice = quantity * profile.price;
    const item: ICartItem = {
      quantity,
      totalPrice,
      name: profile.name,
      price: profile.price,
      id: profile.id,
    };

    const newCart = [...this.items, item];
    this.setItems(newCart);

    return;
  };

  /**
   * Update quantity for specific item
   */
  public updateQuantity = (profile: IProfile, newQuantity: number): void => {
    const cart = [...this.items];
    const result = updateOne(
      cart,
      (p) => p.id.toString() == profile.id.toString(),
      (p) => ({
        ...p,
        quantity: newQuantity,
        totalPrice: p.price * newQuantity,
      })
    );

    // update cart items state
    this.setItems(result);
  };

  /**
   * Remove an item from cart
   */
  public removeItem = (profile: IProfile): void => {
    const cart = [...this.items];

    const newCart = deleteOne(cart, (cartItem) => {
      return cartItem.id.toString() === profile.id.toString();
    });

    //update cart items state
    this.setItems(newCart);
  };

  /**
   * clear cart items.
   */
  public clear = (): void => {
    this.setItems([]);
  };

  /**
   * check if item is exists in cart
   */
  public isExist = (id: IProfile["id"]): boolean => {
    const item = this.items.find((item) => item.id.toString() === id);

    if (item) {
      return true;
    }

    return false;
  };

  public find = (id: IProfile["id"]): ICartItem | undefined => {
    return this.items.find((item) => item.id.toString() === id.toString());
  };
}

export type ICartService = CartService;
