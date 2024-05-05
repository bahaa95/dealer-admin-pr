/* eslint-disable @next/next/no-img-element */
import { LoginForm } from "./_components/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

const BoxedSignIn = () => {
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center sm:px-16 bg-[url('/bg.png')]">
        <div className="relative w-full max-w-[450px] rounded-md ">
          <div className="relative flex flex-col justify-center bg-white/50 p-10 border border-white backdrop-blur-lg rounded-2xl shadow-sm shadow-red-100">
            <div className="mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-3xl font-bold uppercase !leading-snug text-slate-800 md:text-2xl">
                  تسجيل الدخول
                </h1>
              </div>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedSignIn;
