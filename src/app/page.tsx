/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { client } from "../../sanity/lib/client";

import ProductCard from "@/components/Product/Card";

const Home = () => {
  const [products, setProducts] = useState<HomeProductProps>({
    isNew: [],
    isPopular: [],
  });

  const getProduts = async () => {
    const newProducts = await client.fetch(`
    *[_type == "product" && isNew == true][0...4]{
      _id,
      name,
      isNew,
      isPopular,
      isFeatured,
      category,
      price,
      _createdAt,
      _type,
      gender,
      "primaryImageUrl": image[0].asset->url,
      "secondaryImageUrl": image[1].asset->url
    }`);
    const popularProducts = await client.fetch(`
    *[_type == "product" && isPopular == true][0...4]{
      _id,
      name,
      isNew,
      isPopular,
      isFeatured,
      category,
      price,
      _createdAt,
      _type,
      gender,
      "primaryImageUrl": image[0].asset->url,
      "secondaryImageUrl": image[1].asset->url
    }`);
    setProducts({
      ...products,
      isNew: newProducts,
      isPopular: popularProducts,
    });
  };

  useEffect(() => {
    getProduts();
  }, []);

  return (
    <main className="flex flex-col max-w-[1568px] w-full mx-auto gap-2">
      <section className="relative">
        <Image
          src={"/assets/images/hco-20231006-HP-D-GH_New-Arrivals_R.webp"}
          width={1568}
          height={620}
          alt="banner-1"
          className="relative w-full"
        />
        <section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-30%] max-sm:scale-50 max-sm:translate-y-[-50%]">
          <h1 className="text-white text-2xl text-center">
            {" "}
            GILLY HICKS ACTIVE
          </h1>
          <Image
            src={"/assets/images/gh_2023_BeforeDuringApres_White.svg"}
            width={215}
            height={200}
            className=""
            alt="banner-1"
          />
        </section>
      </section>
      <section className="relative">
        <section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white w-[500px] z-10 max-sm:scale-50">
          <h2 className="text-4xl font-bold text-center">
            ULTIMATE FAUX FUR-LINED PUFFER JACKETS
          </h2>
          <h4 className="text-center">
            Ultra warm and insanely versatile. <br />
            They’re the puffers that get everything right.
          </h4>
          <section className="flex gap-4 justify-center mt-4">
            <Link href={"/shop/women"}>
              <button className="bg-white text-black p-4 rounded-md hover:bg-[--blue-smooth] hover:text-white transition-colors ease-in-out">
                Shop Women's
              </button>
            </Link>
            <Link
              href={"/shop/men"}
              className="bg-white text-black p-4 rounded-md hover:bg-[--blue-smooth] hover:text-white transition-colors ease-in-out"
            >
              <button>Shop Men's</button>
            </Link>
          </section>
        </section>
        <video loop autoPlay width={1568}>
          <source
            src="/assets/images/hco-20231012-D-HP-UltimatePufferCollection-USCA_R.mp4"
            type="video/mp4"
          />
        </video>
      </section>
      <section className="relative">
        <section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white w-[500px] z-10 max-lg:scale-50 max-sm:scale-[.25]">
          <h2 className="text-4xl font-bold text-center">
            SELECT SWEATSHIRTS & SWEATPANTS
          </h2>
          <h4 className="text-center">
            LIMITED TIME!. <br />
            25% OFF* SELECT STYLES
          </h4>
          <section className="flex gap-4 justify-center mt-4">
            <Link href={"/shop/women"}>
              <button className="bg-white text-black p-4 rounded-md hover:bg-[--blue-smooth] hover:text-white transition-colors ease-in-out">
                Shop Women's
              </button>
            </Link>
            <Link
              href={"/shop/men"}
              className="bg-white text-black p-4 rounded-md hover:bg-[--blue-smooth] hover:text-white transition-colors ease-in-out"
            >
              <button>Shop Men's</button>
            </Link>
          </section>
        </section>
        <Image
          src={
            "/assets/images/hco-20231023-D-HPB-SelectSweatshirtPromo-USCA.webp"
          }
          width={1568}
          height={620}
          alt="banner-1"
          className="relative"
        />
      </section>
      <section>
        <h1 className="text-center text-4xl font-bold mb-4 tracking-tighter">
          Popular
        </h1>
        <section className="flex gap-4 max-w-[1568px] overflow-x-scroll overflow-y-hidden">
          <section className="flex gap-4">
            {products.isPopular.map((product) => {
              if (product.isPopular) {
                return (
                  <Link
                    href={`/shop/${
                      product?.gender[0] === "male" ? "men" : "women"
                    }/${product._id}`}
                    key={product._id}
                  >
                    <ProductCard
                      _type={product._type}
                      _id={product._id}
                      name={product.name}
                      category={product.category}
                      isNew={product.isNew}
                      isPopular={product.isPopular}
                      isFeatured={product.isFeatured}
                      gender={product.gender}
                      price={product.price}
                      primaryImageUrl={product.primaryImageUrl}
                      secondaryImageUrl={product.secondaryImageUrl}
                      _createdAt={product._createdAt}
                      _UpdatedAt={product._UpdatedAt}
                    />
                  </Link>
                );
              }
            })}
          </section>
        </section>
      </section>
      <section>
        <h1 className="text-center text-4xl font-bold mb-4 tracking-tighter">
          New Arrivals
        </h1>
        <section className="flex gap-4 max-w-[1568px] overflow-x-scroll overflow-y-hidden">
          <section className="flex gap-4 w-full">
            {products.isNew.map((product) => {
              if (product.isNew) {
                return (
                  <Link
                    href={`/shop/${
                      product.gender[0] === "male" ? "men" : "women"
                    }/${product._id}`}
                    key={product._id}
                  >
                    <ProductCard
                      _type={product._type}
                      _id={product._id}
                      name={product.name}
                      category={product.category}
                      isNew={product.isNew}
                      isPopular={product.isPopular}
                      isFeatured={product.isFeatured}
                      gender={product.gender}
                      price={product.price}
                      primaryImageUrl={product.primaryImageUrl}
                      secondaryImageUrl={product.secondaryImageUrl}
                      _createdAt={product._createdAt}
                      _UpdatedAt={product._UpdatedAt}
                    />
                  </Link>
                );
              }
            })}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
