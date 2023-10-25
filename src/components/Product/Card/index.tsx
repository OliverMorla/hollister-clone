import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const ProductCard = ({
  _id,
  name,
  category,
  isNew,
  isPopular,
  price,
  gender,
  primaryImageUrl,
  secondaryImageUrl,
  _createdAt,
  _type,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col shadow-sm cursor-pointer hover:scale-105 transition-transform ease-in-out">
      <section className="flex relative">
        <Image
          src={primaryImageUrl}
          width={250}
          height={275}
          className="relative w-[375px] h-[475px] object-cover"
          alt={name}
        />
        <Image
          src={secondaryImageUrl}
          width={250}
          height={275}
          className="absolute w-[375px] h-[475px] object-cover opacity-0 hover:z-10 hover:opacity-100 transition-all duration-500 ease-in-out "
          alt={name}
        />
        <FontAwesomeIcon
          icon={faHeart}
          width={25}
          className="absolute right-0 bg-[--secondary] p-2 rounded-full m-2"
        />
      </section>
      <section>
        <h3 className="opacity-80">{isNew && "NEW!"}</h3>
        <h3 className="font-bold">{name}</h3>
        <p className="font-light">${price}</p>
      </section>
    </div>
  );
};

export default ProductCard;
