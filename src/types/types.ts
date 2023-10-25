interface ProductCardProps {
  _id: string | number;
  name: string;
  isNew: boolean;
  isPopular: boolean;
  category: string[] | string;
  price: number;
  _createdAt: string;
  _type: String;
  gender: string[] | string;
  primaryImageUrl: string;
  secondaryImageUrl: string;
}

interface ProductProps extends ProductCardProps {}
