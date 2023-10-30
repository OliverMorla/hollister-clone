import { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans } from "next/font/google";

import CartProvider from "@/providers/cart-provider";
import AuthProvider from "@/providers/auth-provider";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";

import "./globals.css";

const NotoSans = Noto_Sans({
  style: "normal",
  display: "swap",
  preload: false,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hollister",
  category: "clothes",
  viewport: "width=device-width, initial-scale=1",
  description: "At hollister you can find the best clothes for the best price",
  keywords: "Hollister, clothes, fashion, jeans, shirts, t-shirts, pants",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={NotoSans.className}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<Loading />}>
              <Header />
              {children}
              <Footer />
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
