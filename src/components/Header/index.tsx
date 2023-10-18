import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faFlagUsa,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const LeftSideNavItems = [
  {
    name: "Women's",
    href: "/shop/women",
  },
  {
    name: "Men's",
    href: "/shop/men",
  },
  {
    name: "Jeans",
    href: "/shop/jeans",
  },
  {
    name: "Activewear",
    href: "/shop/activewear",
  },
  {
    name: "Sale",
    href: "/shop/sale",
  },
  {
    name: "Purpose",
    href: "/shop/purpose",
  },
];

const RightSideNavItems = [
  {
    name: faSearch,
  },
  {
    name: faFlagUsa,
  },
  {
    name: faHeart,
  },
  {
    name: faShoppingBag,
  },
];

const Header = () => {
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
            <button className="flex items-center gap-2 mr-8 font-bold tracking-tighter text-sm">
              <FontAwesomeIcon icon={faUser} height={15} width={15} /> Sign In
              Or Join
            </button>
          </li>
        </ul>
      </section>
      <section className="bg-[--secondary]">
        <section className="flex h-[75px] justify-between max-w-[1568px] w-full mx-auto">
          <ul className="flex list-none items-center font-bold gap-4 ml-8">
            <li>
              <Image
                src={"/assets/logos/logo-4.webp"}
                width={85}
                height={50}
                className="object-contain"
                alt="logo"
              />
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
                />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </header>
  );
};

export default Header;
