/* eslint-disable react/no-unescaped-entities */
"use client";
import { client } from "../../../../../sanity/lib/client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProductCard from "@/components/Product/Card";
import "./page.scss";

const Women = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);

  const getProducts = async () => {
    const fetchedProducts = await client.fetch(
      `*[_type=="product"]{
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
    }`
    );
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="shop">
      <aside className="shop__left-panel">
        <ul className="shop__left-panel__list">
          <li className="shop__left-panel__list-item">
            <Link href={""}>New Arrivals</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Tops</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Bottoms</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Jackets & Coats</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Sleepwear & Loungewear</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Swimwear</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Activewear</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Underwear & Socks</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Accessories & Shoes</Link>
          </li>
          <li className="shop__left-panel__list-item">
            <Link href={""}>Cologne & Body</Link>
          </li>
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
          <select
            name="sort-by"
            id=""
            className="shop__content-header__options"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="best-selling">Best Selling</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="price-low-high">Price: Low to High</option>
          </select>
        </section>
        <section className="shop__content-body">
          {products.map((product) => {
            if (product.gender[0] == "female") {
              return (
                <Link href={`/shop/women/${product._id}`} key={product._id}>
                  <ProductCard
                    _id={product._id}
                    name={product.name}
                    category={product.category}
                    isNew={product.isNew}
                    isPopular={product.isPopular}
                    gender={product.gender}
                    price={product.price}
                    primaryImageUrl={product.primaryImageUrl}
                    secondaryImageUrl={product.secondaryImageUrl}
                    _type={product._type}
                    _createdAt={product._createdAt}
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
              Hollister clothing for Women is designed with comfort, quality,
              and style in mind. Whether you're getting active at the gym or
              gearing up for a night out, we've got the look for you.
            </p>
            <p>
              Hollister clothing for Women is designed with comfort, quality,
              and style in mind. Whether you're getting active at the gym or
              gearing up for a night out, we've got the look for you.
            </p>
            <p>
              And when the temperature drops, we've got your covered with the
              latest on-trend Women's jackets & coats. We are all about layers
              and our hoodies over a basic tee is a classic look. Pair it with
              some Women's jeans and you're ready for a stylish, all day
              comfortable outfit. For a dressier look, a polo with a pair of
              pants is the way to go.
            </p>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Women;
