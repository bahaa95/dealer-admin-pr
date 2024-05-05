import { Metadata } from "next";
import { Home } from "./_components/Home";

export const metadata: Metadata = {
  title: "الطلبات",
};

export default function HomePage() {
  return <Home />;
}
