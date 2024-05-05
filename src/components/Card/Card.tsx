/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cx } from "@/utils";
import React, { FC, useEffect, useState } from "react";
import { Counter } from "../Counter";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatMoney } from "@/utils/formatMoney";
import { useCart } from "@/lib/cart";
import { privateApi } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import { IProfile } from "@/app/order/_types";

type CardProps = {
  profile: IProfile;
};

export const Card: FC<CardProps> = ({ profile }) => {
  const { addNewItem, find, removeItem, updateQuantity } = useCart();
  const item = find(profile.id);
  const [isAvailabe, setIsAvailable] = useState(true);
  const [quantity, setQuantity] = useState(item?.quantity || 0);

  // check current quntity if it is availabel at stock
  const checkQuantity = useDebouncedCallback(async (count) => {
    const api = privateApi();
    return await api.post<{ has_it: boolean }>(
      `/manger-api/sas/check-refil-profile`,
      {
        profile_id: profile.id,
        count,
      },
      {
        headers: { "x-sas": "wifi" },
      }
    );
  }, 1000);

  useEffect(() => {
    if (quantity) {
      updateQuantity(profile, quantity);
      // check quantity if its availabel in stock
      checkQuantity(quantity)?.then((res) => setIsAvailable(res.data.has_it));
    }
  }, [quantity]);

  // useEffect(() => {
  //   return () => {
  //     removeItem(profile);
  //     setQuantity(1);
  //   };
  // }, []);

  return (
    <div
      className={cx(
        " relative flex h-[11em] select-none flex-col items-center justify-between rounded-xl   bg-white/50 py-3 md:h-[7em] md:flex-row md:px-[1em] md:py-0 lg:px-[2em]"
      )}
    >
      {!isAvailabe ? (
        <p className={cx("absolute right-2 top-2 text-xs text-danger")}>
          هذه الكمية غير متاحة
        </p>
      ) : null}
      {/* name */}
      <h3 className={cx("w-[130px] text-[16px] font-medium")}>
        {profile.name}
      </h3>
      {/* price */}
      <span className={cx("w-[100px] text-[1rem] font-normal")}>
        {formatMoney(profile.price)}{" "}
        <span className="text-xs text-slate-500">IQD</span>
      </span>
      {/* quntity */}
      <div className="h- flex w-[100px] items-center justify-between">
        {item?.quantity ? (
          <Counter
            handleDecrease={() => setQuantity((prev) => --prev)}
            handleIncrease={() => setQuantity((prev) => ++prev)}
            value={quantity}
            min={0}
            max={10000}
          />
        ) : null}
      </div>
      {/* total price */}
      <div className="w-[100px] min-w-[2em]">
        {item?.totalPrice ? (
          <span className={cx("text-[1rem] font-normal")}>
            <span className="text-xs mx-1 text-slate-500">IQD</span>
            {formatMoney(item?.totalPrice)}
          </span>
        ) : null}
      </div>
      <div>
        {item ? (
          <RiDeleteBin6Line
            className={cx("cursor-pointer text-[1.2rem]")}
            onClick={() => {
              removeItem(profile);
              setQuantity(1);
            }}
          />
        ) : (
          <AiOutlinePlus
            onClick={() => addNewItem(profile)}
            className={cx("cursor-pointer text-[1.2rem]")}
          />
        )}
      </div>
    </div>
  );
};
