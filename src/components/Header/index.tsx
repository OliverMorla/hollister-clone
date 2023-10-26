"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightSideNavItems, LeftSideNavItems } from "@/config/props-local";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import Cart from "../Cart";
import { motion } from "framer-motion";
import { fadeVariant1 } from "@/config/framer-animations";

const Header = () => {
  const { user, error, isLoading } = useUser();
  const [openCart, setOpenCart] = useState(false);
  return (
    <header className="flex flex-col bg-[--primary]">
      <section className="flex items-center bg-[--primary] h-[50px] justify-between max-w-[1568px] w-full mx-auto">
        <ul className="flex h-full ml-8">
          <li className="flex items-center justify-center w-[100px] bg-[--secondary]">
            <Image
              src={"/assets/logos/logo-3.png"}
              width={35}
              height={50}
              className="object-contain opacity-80"
              alt="logo"
            />
          </li>
          <li className="text-xs w-[100px] opacity-70 flex items-center justify-center tracking-tighter">
            GILLY HICKS
          </li>
          <li className="text-xs w-[100px] opacity-70 flex items-center justify-center italic font-extrabold tracking-tighter">
            SOCIAL TOURIST
          </li>
        </ul>
        <ul className="">
          <li>
            <a
              href={
                user ? "/" : `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
              }
            >
              <button className="flex items-center gap-2 mr-8 font-bold tracking-tighter text-sm">
                <FontAwesomeIcon icon={faUser} height={15} width={15} />{" "}
                {user ? user.name : "Sign in Or Join"}
              </button>
            </a>
          </li>
        </ul>
      </section>
      <section className="bg-[--secondary]">
        <section className="flex h-[75px] justify-between max-w-[1568px] w-full mx-auto">
          <ul className="flex list-none items-center font-bold gap-4 ml-8">
            <li>
              <Link href={"/"}>
                <Image
                  src={"/assets/logos/logo-4.webp"}
                  width={85}
                  height={50}
                  className="object-contain"
                  alt="logo"
                />
              </Link>
            </li>
            {LeftSideNavItems.map((item, index) => (
              <li key={index} className="text-xs">
                <Link href={item.href} className="font-bold">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex list-none items-center font-bold gap-8 mr-8">
            {RightSideNavItems.map((item, index) => (
              <li key={index}>
                <FontAwesomeIcon
                  icon={item.name}
                  className="text-black w-4 cursor-pointer"
                  onClick={() => {
                    if (item.type == "cart") setOpenCart(!openCart);
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      </section>

      {openCart && (
        <motion.aside
          variants={fadeVariant1}
          initial="hidden"
          animate="visible"
        >
          <Cart />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
