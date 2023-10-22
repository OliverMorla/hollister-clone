/* eslint-disable react/no-unescaped-entities */
import "./page.scss";
import Link from "next/link";
import Image from "next/image";
import { Products } from "@/config/props-local";
import ProductCard from "@/components/Product/Card";

const Women = () => {
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
          <title>Collections</title>
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
          {Products.map((product) => {
            if (product.gender === "Female") {
              return (
                <ProductCard
                  id={product.id}
                  product_name={product.product_name}
                  category={product.category}
                  isNew={product.isNew}
                  isPopular={product.isPopular}
                  gender={product.gender}
                  price={product.price}
                  primary_image={product.primary_src}
                  secondary_image={product.secondary_src}
                  key={product.id}
                />
              );
            }
          })}
        </section>
      </section>
    </main>
  );
};

export default Women;
