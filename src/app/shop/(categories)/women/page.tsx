/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../../../../../sanity/lib/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/Product/Card";
import { useSearchParams } from "next/navigation";
import "./page.scss";

const Women = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const currentCategory = useSearchParams().get("category");

  const getProducts = async () => {
    const fetchedProducts: ProductProps[] | any = await client.fetch(
      `
      *[_type=="product" && gender[0] == "female"]{
        _id,
        name,
        isNew,
        isPopular,
        category,
        price,
        _createdAt,
        _type,
        gender,
        "primaryImageUrl": image[0].asset->url,
        "secondaryImageUrl": image[1].asset->url
      }
    `
    );

    setProducts(fetchedProducts);
    const getCategories = async () => {
      const fetchedCategories: string[] = [];

      await Promise.all(
        fetchedProducts.map(async (product: ProductProps) => {
          await Promise.all(
            product.category.map(async (category: string) => {
              fetchedCategories.push(
                category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()
              );
            })
          );
        })
      );

      const categoriesFiltered = Array.from(new Set(fetchedCategories));
      setCategories(categoriesFiltered);
    };
    getCategories();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="shop">
      <aside className="shop__left-panel">
        <ul className="shop__left-panel__list">
          {currentCategory && (
            <li className="shop__left-panel__list-item">
              <Link
                href={"/shop/men"}
                style={{
                  fontWeight: currentCategory === null ? "bold" : "normal",
                  textDecoration:
                    currentCategory === null ? "underline" : "none",
                }}
              >
                All
              </Link>
            </li>
          )}
          {categories.map((category, index) => (
            <li className="shop__left-panel__list-item" key={index}>
              <Link
                href={`/shop/men?category=${category}`}
                style={{
                  fontWeight: currentCategory === category ? "bold" : "normal",
                  textDecoration:
                    currentCategory === category ? "underline" : "none",
                }}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="shop__left-panel__list-2">
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Collections
          </h2>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Multipacks</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Licensed Collection</Link>
          </li>
        </ul>
        <ul className="shop__left-panel__list-3">
          <li className="shop__left-panel__list-item">
            <Link href={""}>Clearance</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Up To 50% Off Select Styles</Link>
          </li>
        </ul>
      </aside>
      <section className="shop__content">
        <section className="shop__content-header">
          <h3 className="shop__content-header__title">Women's Clothing</h3>
          <select name="sort-by" className="shop__content-header__options">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="best-selling">Best Selling</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="price-low-high">Price: Low to High</option>
          </select>
        </section>
        <section className="shop__content-body">
          {products?.map((product) => {
            if (
              currentCategory &&
              product.category.includes(currentCategory.toLowerCase())
            ) {
              return (
                <Link href={`/shop/women/${product._id}`} key={product._id}>
                  <ProductCard
                    _id={product._id}
                    _type={product._type}
                    name={product.name}
                    isNew={product.isNew}
                    isPopular={product.isPopular}
                    isFeatured={product.isFeatured}
                    category={product.category}
                    gender={product.gender}
                    price={product.price}
                    primaryImageUrl={product.primaryImageUrl}
                    secondaryImageUrl={product.secondaryImageUrl}
                    _createdAt={product._createdAt}
                    _UpdatedAt={product._UpdatedAt}
                  />
                </Link>
              );
            } else if (currentCategory === null) {
              return (
                <Link href={`/shop/women/${product._id}`} key={product._id}>
                  <ProductCard
                    _id={product._id}
                    _type={product._type}
                    name={product.name}
                    isNew={product.isNew}
                    isPopular={product.isPopular}
                    isFeatured={product.isFeatured}
                    category={product.category}
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
        <section className="shop__content-footer">
          <section className="shop__content-footer__page-btn">
            <section className="shop__content-footer__arrow">
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                width={25}
                className="shop__content-footer__icon"
              />
              <p>Previous</p>
            </section>
            <h1>1 Of 20</h1>
            <section className="shop__content-footer__arrow">
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                width={25}
                className="shop__content-footer__icon"
              />
              <p>Next</p>
            </section>
          </section>
          <section className="shop__content-footer__notes">
            <h1 className="font-bold text-base">CLOTHING FOR WOMEN</h1>
            <p>
              Hollister clothing for men is designed with comfort, quality, and
              style in mind. Whether you're getting active at the gym or gearing
              up for a night out, we've got the look for you.
            </p>
            <p>
              Hollister clothing for men is designed with comfort, quality, and
              style in mind. Whether you're getting active at the gym or gearing
              up for a night out, we've got the look for you.
            </p>
            <p>
              And when the temperature drops, we've got your covered with the
              latest on-trend men's jackets & coats. We are all about layers and
              our hoodies over a basic tee is a classic look. Pair it with some
              men's jeans and you're ready for a stylish, all day comfortable
              outfit. For a dressier look, a polo with a pair of pants is the
              way to go.
            </p>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Women;
