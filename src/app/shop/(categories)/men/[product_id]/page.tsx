"use client";

import PaymentForm from "@/components/PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { client } from "../../../../../../sanity/lib/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import "./page.scss";
const Product = ({
  params: { product_id },
}: {
  params: {
    product_id: string;
  };
}) => {
  const [product, setProduct] = useState<ProductProps>();
  const [productOptions, setProductOptions] = useState({
    quantity: 1,
    size: "S",
  });
  const getProduct = async () => {
    const product = await client.fetch(
      `*[_type == "product" && _id == $product_id][0]{
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
      }`,
      { product_id }
    );
    setProduct(product);
  };

  useEffect(() => {
    getProduct();
  }, []);
  console.log(product);
  console.log(product_id);
  console.log(productOptions);

  if (product) {
    return (
      <main className="product">
        <section className="product__content">
          <section className="product__images">
            <Image
              src={product.primaryImageUrl}
              width={400}
              height={500}
              alt={product.name}
              className="product__image"
            />
            <Image
              src={product.secondaryImageUrl}
              width={400}
              height={500}
              alt={product.name}
              className="product__image"
            />
          </section>
          <section className="product__options">
            <h2 className="product__name">{product.name}</h2>
            <p className="product__price">${product.price}</p>
            <p className="text-sm opacity-80">
              Pay in 4 interest-free payments of $9.99 with
            </p>
            <section className="product__quantity">
              <label htmlFor="product__quantity-select">QTY</label>
              <select
                name="quantity"
                className="product__quantity-select"
                onChange={(e) =>
                  setProductOptions({
                    ...productOptions,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <optgroup label="QTY">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </optgroup>
              </select>
            </section>

            {product && (
              <section className="flex gap-4">
                <PaymentForm
                  name={product.name}
                  price={product.price}
                  quantity={productOptions.quantity}
                  size={productOptions.size}
                />
                <button className="bg-[--blue-light] p-4 text-white rounded-3xl">
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    width={25}
                    className=""
                  />
                  Add To Bag
                </button>
              </section>
            )}
          </section>
        </section>
        <section className="product__recommendations"></section>
        <section className="product__reviews"></section>
      </main>
    );
  } else {
    return <Loading />;
  }
};

export default Product;
