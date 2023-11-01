import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const ProductCard = ({
  _id,
  _type,
  name,
  category,
  isNew,
  isPopular,
  isFeatured,
  price,
  gender,
  primaryImageUrl,
  secondaryImageUrl,
  _createdAt,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col shadow-sm cursor-pointer transition-transform ease-in-out">
      <section className="flex relative">
        <Image
          src={primaryImageUrl}
          width={375}
          height={475}
          className="relative w-[375px] h-[475px] object-cover"
          alt={name}
        />
        <section className="absolute h-full w-full">
          <Image
            src={secondaryImageUrl}
            width={375}
            height={475}
            className="absolute w-[375px] h-[475px] object-cover opacity-0 hover:z-10 hover:opacity-100 transition-all duration-500 ease-in-out"
            alt={name}
          />
          <FontAwesomeIcon
            icon={faHeart}
            width={25}
            height={25}
            className="absolute right-0 bg-[--secondary] min-h-[25px] min-w-[25px] p-2 rounded-full m-2 z-10 hover:bg-[--red-smooth] hover:text-white transition-colors ease-in-out"
          />
        </section>
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
