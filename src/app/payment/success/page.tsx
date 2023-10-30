"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import React from "react";

import { fadeVariant1 } from "@/config/framer-animations";

const Success = () => {
  return (
    <motion.main
      variants={fadeVariant1}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 min-h-screen flex flex-col justify-center items-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Your payment was successful!
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for your purchase. Your order will be shipped soon.
        </p>
        <Link href={"/"}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    </motion.main>
  );
};

export default Success;
