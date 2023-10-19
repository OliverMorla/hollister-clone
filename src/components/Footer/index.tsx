import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col min-h-[675px] bg-[--primary]">
      <section className="flex flex-col items-center w-full">
        <h2>Because our legal team said we have to talk about legal stuff:</h2>
        <p className="text-xs opacity-80">
          *Offer valid online only October 17, 2023 to October 19, 2023 in
          US/CA. Exclusions apply as indicated. Discount applied at checkout.
        </p>
        <Link href={""} className="underline">
          See All Offer Details
        </Link>
      </section>
      <section className="flex">
        <ul className="flex flex-col">
          <li className="pb-2 border-b-2">
            <Image
              src={"/assets/logos/logo-3.png"}
              width={85}
              height={50}
              className="object-contain opacity-80"
              alt="logo"
            />
          </li>
          <li>Our Brands</li>
          <Image
            src={"/assets/logos/logo-4.webp"}
            width={85}
            height={50}
            className="object-contain opacity-80"
            alt="logo"
          />
        </ul>

        <ul className="flex flex-col">
          <li>Our Brands</li>
        </ul>
        <ul className="flex flex-col">
          <li></li>
        </ul>
        <ul className="flex flex-col">
          <li>GILLY HICKS</li>
        </ul>
        <ul className="flex flex-col">
          <li>SOCIAL TOURIST</li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
