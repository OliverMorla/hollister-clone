import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  id,
  product_name,
  category,
  isNew,
  isPopular,
  price,
  gender,
  primary_image,
  secondary_image,
}: ProductCardProps) => {
  return (
    <Link href={`/shop/men/${id}`}>
      <div className="flex flex-col shadow-sm cursor-pointer hover:scale-105 transition-transform ease-in-out">
        <section className="flex relative">
          <Image
            src={primary_image}
            width={250}
            height={275}
            className="relative min-w-[250px] h-[312.50px] object-cover"
            alt={product_name}
          />
          <Image
            src={secondary_image}
            width={250}
            height={275}
            className="absolute min-w-[250px] h-[312.50px] object-cover opacity-0 hover:z-10 hover:opacity-100 transition-all duration-500 ease-in-out "
            alt={product_name}
          />
        </section>
        <section>
          <h3 className="opacity-80">{isNew && "NEW!"}</h3>
          <h3 className="font-bold">{product_name}</h3>
          <p className="font-light">${price}</p>
        </section>
      </div>
    </Link>
  );
};

export default ProductCard;
