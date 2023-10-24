"use client"

import PaymentForm from "@/components/PaymentForm";
import { client } from "../../../../../../sanity/lib/client";
import "./page.scss";
const Product = ({
  params: { product_id },
}: {
  params: {
    product_id: string;
  };
}) => {
  const getProduct = async () => {
    const product = await client.fetch(
      `*[_type == "product" && _id == $product_id][0]`,
      { product_id }
    );
    return product;
  };
  return (
    <main className="product">
      <section className="product__content">
        <section className="product__images"></section>
        <section className="product__options">
            <PaymentForm />
        </section>
      </section>
      <section className="product__recommendations"></section>
      <section className="product__reviews"></section>
    </main>
  );
};

export default Product;
