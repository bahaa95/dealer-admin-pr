import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { cx } from "@/utils";
import { AuthProvider, CheckAuth } from "@/lib/auth";
import { ClientOnly } from "@/components";
import { CartProvider } from "@/lib/cart/";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={cx(inter.className, " bg-gray-300 ")}>
        <ClientOnly>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <CheckAuth>
                <CartProvider>{children}</CartProvider>
              </CheckAuth>
            </AuthProvider>
          </QueryClientProvider>
        </ClientOnly>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
