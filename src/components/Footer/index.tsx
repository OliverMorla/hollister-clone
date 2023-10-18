import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex min-h-[675px] bg-[--primary]">
      <section className="flex flex-col items-center w-full">
        <h2>Because our legal team said we have to talk about legal stuff:</h2>
        <p className="text-xs opacity-80">
          *Offer valid online only October 17, 2023 to October 19, 2023 in
          US/CA. Exclusions apply as indicated. Discount applied at checkout.
        </p>
        <Link href={""} className="underline">See All Offer Details</Link>
      </section>
    </footer>
  );
};

export default Footer;
