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

interface CartProps {
  items: ProductCardProps[];
  totalQuantity: number;
  changed: boolean;
}

interface CartItemsProps {
  id: string;
  price: number;
  name: string;
  quantity: number;
  size: string;
  cartPhoto: string;
}

interface User {
  user_id: string;
  nickname: string;
  name: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  password?: string;
  role: string;
}
