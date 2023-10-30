/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { LoadingWithoutBg } from "@/components/Loading";
import Image from "next/image";

const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Orders[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/dashboard");
      const data = await res.json();

      if (data.ok) {
        setUser(data.user);
        setLoading(false);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      err instanceof Error && setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/orders");
      const data = await res.json();

      if (data.ok) {
        setOrders(data.orders);
        setLoading(false);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      err instanceof Error && setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getOrders();
  }, []);

  console.log(orders);
  console.log(user);

  return (
    <main className="flex h-full w-full justify-center items center flex-col">
      {!user ? (
        <LoadingWithoutBg />
      ) : (
        <>
          <section className="">
            <h1 className="text-3xl font-thin text-center">
              Welcome to your dashboard{" "}
              <span className="font-bold">{user?.name}</span>
            </h1>
          </section>
          <section>
            <section className="flex flex-col">
              <section className="flex flex-col items-center justify-center">
                <p className="text-center text-gray-400">
                  You can edit your profile here
                </p>
                <section className="flex gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                    Edit Profile
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ">
                    Delete Account
                  </button>
                </section>
                <ul>
                  <li>
                    <span className="font-bold">Email:</span> {user?.email}
                  </li>
                  <li>
                    <span className="font-bold">Nickname:</span>{" "}
                    {user?.nickname}
                  </li>
                  <li>
                    <span className="font-bold">Password:</span>
                    {user?.password}
                  </li>
                </ul>
              </section>
              <section className="flex flex-col justify-center items-center h-[800px] overflow-y-scroll">
                <h1 className="font-bold">Orders</h1>
                {orders?.map((order) => (
                  <>
                    <section
                      key={order.order_id}
                      className="flex justify-center gap-2 "
                    >
                      <ul className="flex flex-col items-center justify-center">
                        <li>
                          <span className="font-bold">Order ID:</span>{" "}
                          {order.order_id}
                        </li>
                        <li>
                          <span className="font-bold">Order Status:</span>{" "}
                          {order.order_status}
                        </li>
                        <li>
                          <span className="font-bold">Order Date:</span>{" "}
                          {order.order_date.toLocaleString()}
                        </li>
                        <li>
                          <span className="font-bold">Total Quantity:</span>{" "}
                          {order.total_quantity}
                        </li>
                        <li>
                          <span className="font-bold">Order Total:</span>{" "}
                          {order.total_price}
                        </li>
                        <li>
                          <span className="font-bold">Product ID:</span>
                          {order.product_id}
                        </li>
                      </ul>
                      <Image
                        width={200}
                        height={200}
                        src={order.product?.primaryImage}
                        alt="product image"
                      />
                    </section>
                    
                  </>
                ))}
              </section>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default Dashboard;
