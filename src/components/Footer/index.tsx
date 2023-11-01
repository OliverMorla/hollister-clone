import { faGift, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialMediaIcons } from "@/config/props-local";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col min-h-[675px] bg-[--primary]">
      <section className="flex flex-col items-center w-full pt-2">
        <h2>Because our legal team said we have to talk about legal stuff:</h2>
        <p className="text-xs opacity-80">
          *Offer valid online only October 17, 2023 to October 19, 2023 in
          US/CA. Exclusions apply as indicated. Discount applied at checkout.
        </p>
        <Link href={""} className="underline">
          See All Offer Details
        </Link>
      </section>
      <section className="flex justify-evenly pt-[50px] pb-[130px]">
        <ul className="flex flex-col gap-4">
          <li className="pb-2 border-b-2">
            <Image
              src={"/assets/logos/logo-3.png"}
              width={85}
              height={25}
              className="object-contain opacity-80"
              alt="logo"
            />
          </li>
          <li>Our Brands</li>
          <li>
            <Image
              src={"/assets/logos/logo-4.webp"}
              width={65}
              height={40}
              className="object-contain opacity-80"
              alt="logo"
            />
          </li>
          <li className="text-xs opacity-70 tracking-tighter">GILLY HICKS</li>
          <li className="text-xs opacity-70 tracking-tighter font-extrabold italic">
            SOCIAL TOURIST
          </li>
          <li className="text-xs opacity-70 tracking-tighter font-bold">
            Abercrombie & Fitch
          </li>
          <li className="text-xs opacity-70 tracking-tighter font-bold">
            abercrombie kids
          </li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="font-bold">About Us</li>
          <li className="text-xs opacity-80">Brand Protection</li>
          <li className="text-xs opacity-80">Careers</li>
          <li className="text-xs opacity-80">A&F Gives Back</li>
          <li className="text-xs opacity-80">Accessibility</li>
          <li className="text-xs opacity-80">Inclusion & Diversity</li>
          <li className="text-xs opacity-80">Press Room</li>
          <li className="text-xs opacity-80">Sustainability</li>
          <li className="text-xs opacity-80">California Disclosures</li>
          <li className="text-xs opacity-80">
            Associate Affiliate Application
          </li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="font-bold">Help</li>
          <li className="text-xs opacity-80">Customer Help</li>
          <li className="text-xs opacity-80">About Hollister House Rewards</li>
          <li className="text-xs opacity-80">Order Help</li>
          <li className="text-xs opacity-80">Shipping & Handling</li>
          <li className="text-xs opacity-80">Online Returns</li>
          <li className="text-xs opacity-80">Track My Order</li>
          <li className="text-xs opacity-80">Cards & E-Cards</li>
          <li className="text-xs opacity-80">Student Discount</li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGift} width={20} height={20} />
            Gift Cards
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapPin} width={20} height={20} />
            Find a Store
          </li>
          <li>Dark Mode</li>
        </ul>
        <ul className="flex flex-col w-[350px] gap-4">
          <li className="font-bold mb-6">Subscribe</li>
          <li>
            <form action="" className="relative">
              <input
                type="text"
                name="newsletter-input"
                className="appearance-none bg-transparent border-b-[1px] border-black p-3 w-full"
                placeholder="Enter Email Address"
              />
              <button className="bg-[--black-smooth] text-[white] font-bold px-8 py-2 rounded-3xl absolute right-0">
                Join
              </button>
            </form>
          </li>
          <li className="text-xs">
            California residents, please see our Notice of Financial Incentive
          </li>
          <li className="font-bold">TREND WITH US</li>
          <li className="text-sm">
            See The Latest On Our Instagram Feed, And Connect With Us On
            Facebook, Twitter & More.
          </li>
          <li className="flex justify-between opacity-80 mt-6">
            {SocialMediaIcons.map((icon, index) => (
              <FontAwesomeIcon
                icon={icon.name}
                key={index}
                width={20}
                height={20}
              />
            ))}
          </li>
        </ul>
      </section>
      <section>
        <ul className="flex max-w-[1568px] gap-4 mx-auto w-full border-t pt-4">
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Privacy / Ad Cookies
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Sale Terms
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Text Terms
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Website Terms of Use
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Endorsements Social Media Engagement
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3"
            >
              Do Not Sell or Share My Personal Information
            </Link>
          </li>
          <li>
            <Link
              href={""}
              className="text-xs underline opacity-60 border-r-[3px] border-grey pr-3git"
            >
              Responsible Disclosure
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
