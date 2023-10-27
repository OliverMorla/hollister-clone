import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faFlagUsa,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const Products = [
  {
    id: "1",
    product_name: "All Black Suit",
    category: "Formal",
    isNew: true,
    isPopular: false,
    price: 299.99,
    gender: "Male",
    primary_src: "/assets/products/product-2.webp",
    secondary_src: "/assets/products/product-2-secondary.webp",
  },
  {
    id: "2",
    product_name: "Smooth Red Tie w/Blazer",
    category: "Formal",
    isNew: false,
    isPopular: true,
    price: 99.99,
    gender: "Male",
    primary_src: "/assets/products/product-1.webp",
    secondary_src: "/assets/products/product-1-secondary.webp",
  },
  {
    id: "3",
    product_name: "Blue Scarf",
    category: "Casual",
    isNew: true,
    isPopular: false,
    price: 49.99,
    gender: "Female",
    primary_src: "/assets/products/product-3.webp",
    secondary_src: "/assets/products/product-3-secondary.webp",
  },
];

const SocialMediaIcons = [
  {
    name: faFacebook,
  },
  {
    name: faTwitter,
  },
  {
    name: faPinterest,
  },
  {
    name: faInstagram,
  },
  {
    name: faYoutube,
  },
];

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
    type: "cart",
  },
];

export { Products, SocialMediaIcons, LeftSideNavItems, RightSideNavItems };
