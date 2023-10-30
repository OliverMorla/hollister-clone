interface ProductCardProps {
  _type: String;
  _id: string;
  name: string;
  description?: string;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  size?: string[];
  color?: string[];
  category?: string[] | string;
  gender: string[] | string;
  price: number;
  primaryImageUrl: string;
  secondaryImageUrl: string;
  _createdAt: string | Date;
  _UpdatedAt: string | Date;
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

interface StripePostRequest {
  quantity?: number;
  price?: number;
  name?: string;
  size?: string;
  items?: CartItemsProps[];
}

interface Orders {
  order_id: number;
  order_date: Date | string;
  total_price: number;
  payment_id: string;
  user_id: number;
  product_id: string | any;
}
