"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slices/cart-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

import { client } from "../../../../../../sanity/lib/client";

import PaymentForm from "@/components/PaymentForm";
import { Loading } from "@/components/Loading";

import "./page.scss";

const Product = ({
  params: { product_id },
}: {
  params: {
    product_id: string;
  };
}) => {
  const cartDispatch = useDispatch();
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState<string>("");
  const [productOptions, setProductOptions] = useState({
    color: "",
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
        isFeatured,
        category,
        price,
        _createdAt,
        _type,
        gender,
        color,
        size,
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

  const currentCart = useSelector((state: any) => state.cartReducer.items);

  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.currentTarget.name === "add-to-cart" && product) {
      cartDispatch(
        addToCart({
          id: product._id as string,
          name: product.name,
          price: product.price,
          quantity: productOptions.quantity,
          size: productOptions.size,
          color: productOptions.color,
          cartPhoto: product.primaryImageUrl,
        })
      );
    } else if (e.currentTarget.name === "remove-from-cart" && product) {
      cartDispatch(removeFromCart({ id: product._id }));
    }
  };

  if (product) {
    return (
      <main className="product">
        {product.isNew && (
          <p className="bg-green-400 w-fit px-2 mb-2 font-bold">NEW</p>
        )}
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
            <p className="text-sm opacity-80">
              $1500 with <span className="font-bold"> Klarna </span> or{" "}
              <span className="text-[--blue-light]">
                {" "}
                <FontAwesomeIcon icon={faPaypal} /> Paypal
              </span>
            </p>
            <section className="product__color">
              <span>
                Color:{" "}
                <span className="text-[--blue-light]">
                  {productOptions.color !== "" ? productOptions.color : "Black"}
                </span>
              </span>
              <section className="product__color-options">
                {product.color?.map((color) => (
                  <label htmlFor="color" key={color}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      style={{
                        appearance: "none",
                        width: "35px",
                        height: "35px",
                        backgroundColor: color,
                        borderRadius: "50%",
                        border:
                          productOptions.color ===
                          color.charAt(0).toUpperCase() +
                            color.slice(1).toLowerCase()
                            ? "2px solid black"
                            : "",
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductOptions({
                          ...productOptions,
                          [e.target.name]:
                            e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1).toLowerCase(),
                        })
                      }
                    />
                  </label>
                ))}
              </section>
            </section>
            <p className="font-bold text-sm">
              1842 people are currently looking at this product.
            </p>
            <section>
              <section className="flex justify-between">
                <h4 className="font-bold">Size</h4>
                <h6 className="text-sm opacity-80">Size Guide</h6>
              </section>
              <section className="flex gap-4">
                {product?.size?.map((size, index) => (
                  <section
                    key={index}
                    className="relative flex items-center justify-center"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.toUpperCase()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductOptions({
                          ...productOptions,
                          [e.target.name]: e.target.value,
                        })
                      }
                      style={{
                        border:
                          productOptions.size === size.toUpperCase()
                            ? "2px solid black"
                            : "",
                      }}
                      className="appearance-none w-8 h-8 border border-gray-300 rounded-full cursor-pointer  hover:border-black transition-colors"
                    />
                    <label
                      htmlFor="size"
                      className="uppercase absolute cursor-pointer hover:border-black transition-colors"
                    >
                      {size}
                    </label>
                  </section>
                ))}
              </section>
            </section>
            <p className="text-xs opacity-80">
              Customers say it fits:{" "}
              <span className="underline">True to size</span>
            </p>

            {product && (
              <section className="flex gap-4 items-center">
                <section className="product__quantity">
                  <label htmlFor="product__quantity-select">QTY</label>
                  <select
                    name="quantity"
                    className="product__quantity-input"
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

                <button
                  className="bg-[--blue-smooth] p-4 text-white rounded-3xl w-full hover:bg-slate-800 transition-colors"
                  onClick={(e) => handleCart(e)}
                  name="add-to-cart"
                >
                  <FontAwesomeIcon icon={faShoppingBag} width={25} />
                  Add To Bag
                </button>
              </section>
            )}
            <PaymentForm
              product_id={product._id}
              name={product.name}
              price={product.price}
              quantity={productOptions.quantity}
              size={productOptions.size}
              color={productOptions.color}
            />
            <section>
              <p className="opacity-80 text-xs mt-4">
                Free Shipping on Orders Over $59 + <br />
                Free Exchanges & Easy Returns <br />
                <br />
                Hollister House Rewards Gold Status Members <br />
                get FREE SHIPPING on every single order. <br />
                Learn More
              </p>
            </section>
          </section>
        </section>
        {/* <section className="product__recommendations"></section>
        <section className="product__reviews">
          <section className="product__reviews-headers">
            <section className="product__reviews-headers__title">
              <h1>Reviews</h1>
              <p>Rating Snapshot</p>
            </section>
            <section className="product__reviews-headers__ratings">
              <h2>Overall Rating</h2>
            </section>
          </section>
          <section className="product__reviews-body">
            <section className="product__reviews__filter"></section>
            <ul className="product__reviews-items">
              <li className="product__reviews-item">
                <div className=".product__reviews-item__header"></div>
                <div className="product__reviews-item__body"></div>
              </li>
            </ul>
          </section>
        </section> */}
      </main>
    );
  } else {
    return <Loading />;
  }
};

export default Product;
