import { Noto_Sans } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Noto_Sans({
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
      <UserProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
