"use client";
import { cx } from "@/utils";
import React, { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
  const { auth } = useAuth();

  const router = useRouter();
  const handleLogout = () => {
    cookie.remove("token");
    router.replace("/login");
  };

  return (
    <div
      className={cx(
        "z-50  fixed top-0 flex max-h-[5em] w-full items-center justify-between bg-indigo-50  border-white px-[4.5em] py-2 border-b",
        className
      )}
    >
      <div className="flex items-center">
        <ul className="ms-8 flex text-[15px] font-semibold">
          <li className="me-7">
            <Link
              href={"/"}
              className=" transition-colors hover:text-[crimson]"
            >
              الصفحة الرئيسية
            </Link>
          </li>
          <li className="me-7">
            <Link
              href={"/orders"}
              className=" transition-colors hover:text-primary"
            >
              الفواتير
            </Link>
          </li>
          <li className="me-7">
            <Link
              href={"/cashers"}
              className=" transition-colors hover:text-primary"
            >
              الكاشير{""}
            </Link>
          </li>
          <li className="me-7">
            <Link
              href={"/transactions"}
              className=" transition-colors hover:text-primary"
            >
              الحركات المالية{""}
            </Link>
          </li>

          <li className="me-7">
            <Link
              href={"/wallet"}
              className="font-medium transition-colors hover:text-primary"
            >
              اضافة معلومات البطاقة
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="font-bold  capitalize text-slate-700 ">
          {localStorage.getItem("name")}
        </h1>
        <Popover>
          <PopoverTrigger>
            <Image
              className=" rounded-full"
              alt="profile"
              width={45}
              height={45}
              src={"/avatar.jpg"}
            />
          </PopoverTrigger>
          <PopoverContent className="z-50">
            <div className="rounded-lg bg-white px-8 py-4 shadow-lg">
              <span
                onClick={handleLogout}
                className="cursor-pointer transition-colors hover:text-primary"
              >
                تسجيل الخروج
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
