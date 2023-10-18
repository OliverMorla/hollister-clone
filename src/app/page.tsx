"use client";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex mx-auto flex-col gap-2">
      <section className="relative">
        <Image
          src={"/assets/images/hco-20231006-D-HP-MidSeasonSale-USCA-v2.webp"}
          width={1568}
          height={620}
          alt="banner-1"
        />
        <Image
          src={
            "/assets/images/hco-2023-Holiday-Mid-Season-Sale-EMEA-White.webp"
          }
          width={175}
          height={30}
          className="absolute top-0 left-[50%] object-cover translate-x-[-50%] mt-8"
          alt="banner-1"
        />
      </section>
      <section className="">
        <video loop autoPlay width={1568}>
          <source
            src="/assets/images/hco-20231012-D-HP-UltimatePufferCollection-USCA_R.mp4"
            type="video/mp4"
          />
        </video>
      </section>
    </main>
  );
};

export default Home;
