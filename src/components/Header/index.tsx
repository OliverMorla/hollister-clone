"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightSideNavItems, LeftSideNavItems } from "@/config/props-local";
import { useSession, signOut } from "next-auth/react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { fadeVariant1 } from "@/config/framer-animations";
import Cart from "../Cart";
import AuthForm from "../AuthForm";
import { useSelector } from "react-redux";
const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState<boolean>(false);
  const cart: CartItemsProps[] = useSelector(
    (state: any) => state.cartReducer.items
  );
  const { data: session } = useSession();
  return (
    <header className="flex flex-col bg-[--primary]">
      <section className="flex items-center bg-[--primary] h-[50px] justify-between max-w-[1568px] w-full mx-auto max-sm:flex-col max-sm:h-auto max-sm:p-4 max-sm:gap-2">
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
        <ul className="flex items-center gap-2">
          <li className="hover:underline">
            {session?.user && (
              <button
                onClick={() =>
                  signOut({
                    redirect: false,
                    callbackUrl: "/",
                  })
                }
              >
                Log Out
              </button>
            )}
          </li>
          <li className="hover:font-bold transition-all border-r-2 border-r-[black] pr-2">
            {session?.user && <Link href={"/auth/dashboard"}>Dashboard</Link>}
          </li>

          <li>
            <button
              className="flex items-center gap-2 font-bold tracking-tighter text-sm"
              onClick={() => !session?.user && setOpenAuthForm(!openAuthForm)}
            >
              <FontAwesomeIcon icon={faUser} height={15} width={15} />{" "}
              {session?.user ? session.user.name : "Sign in Or Join"}
            </button>
          </li>
        </ul>
      </section>
      <section className="bg-[--secondary]">
        <section className="flex h-[75px] justify-between max-w-[1568px] w-full mx-auto max-md:flex-col max-md:h-auto max-md:items-center">
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
              <li
                key={index}
                className="text-xs hover:scale-125 transition-transform"
              >
                <Link href={item.href} className="font-bold">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex list-none items-center font-bold gap-8 mr-8">
            {RightSideNavItems.map((item, index) => (
              <li key={index} className="flex relative">
                <FontAwesomeIcon
                  icon={item.name}
                  className="text-black w-4 cursor-pointer hover:scale-125 transition-transform ease-in-out"
                  onClick={() => {
                    if (item.type == "cart") setOpenCart(!openCart);
                  }}
                />
                {item.type == "cart" && (
                  <div>
                    {/* {Array.isArray(cart) && cart.length >= 1 ? (
                      <span className="absolute top-0 right-0 bg-[--red-smooth] min-h-[15px] min-w-[15px] rounded-full text-xs text-white flex justify-center items-center m-2">
                        {cart.length}
                      </span>
                    ) : (
                      ""
                    )} */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* Cart Modal */}
      {openCart && (
        <motion.aside
          variants={fadeVariant1}
          initial="hidden"
          animate="visible"
        >
          <Cart openCart={openCart} setOpenCart={setOpenCart} />
        </motion.aside>
      )}

      {/* Authentication Modal */}
      {openAuthForm && (
        <motion.aside
          variants={fadeVariant1}
          initial="hidden"
          animate="visible"
          className=" absolute flex justify-center items-center w-screen h-screen bg-black bg-opacity-50 z-20"
        >
          <AuthForm
            openAuthForm={openAuthForm}
            setOpenAuthForm={setOpenAuthForm}
          />
        </motion.aside>
      )}
    </header>
  );
};

export default Header;
