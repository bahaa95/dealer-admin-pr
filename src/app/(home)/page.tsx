import React from "react";
import { HomeContainer } from "./_components/HomeContainer";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"الصفحة الرئيسية"
}

const Home = () => {
  return (
    <div>
      <HomeContainer />
    </div>
  );
};

export default Home;
