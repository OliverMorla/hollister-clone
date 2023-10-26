import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "Hollister - Shop",
  category: "clothes",
  viewport: "width=device-width, initial-scale=1",
  description: "At hollister you can find the best clothes for the best price",
  keywords: "Hollister, clothes, fashion, jeans, shirts, t-shirts, pants",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Layout;
