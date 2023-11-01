import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { removeFromCart } from "@/redux/slices/cart-slice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import PaymentForm from "../PaymentForm";

const Cart = ({
  openCart,
  setOpenCart,
}: {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cart: CartItemsProps[] = useSelector(
    (state: any) => state.cartReducer.items
  );
  const cartDispatch = useDispatch();

  return (
    <div className="flex flex-col bg-white fixed left-0 top-0 w-[400px] min-h-[500px] z-30 p-4 rounded-2xl">
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-3xl text-center">Cart</h1>
        <FontAwesomeIcon
          icon={faXmarkSquare}
          onClick={() => setOpenCart(!openCart)}
          width={25}
          height={25}
          className="absolute right-0 cursor-pointer hover:scale-125 transition-transform ease-in-out"
        />
      </div>
      <div className="p-4 opacity-80">
        {cart.length === 0 ? (
          <h1>Cart is Empty</h1>
        ) : (
          <h1> There is {cart.length} items</h1>
        )}
      </div>
      <div className="flex flex-col p-4 gap-2">
        {cart.map((item: any) => (
          <div key={item.id} className="flex gap-4">
            <div>
              <Image
                src={item.cartPhoto}
                width={100}
                height={100}
                alt={item.name}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold">{item.name}</h3>
              <h3 className="opacity-80">
                <span className="font-bold">Unit Price:</span> ${item.price}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Quantity:</span>
                {item.quantity}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Size:</span>
                {item.size}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Color:</span>
                {item.color}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Total:</span>$
                {item.quantity * item.price}
              </h3>
            </div>

            <button
              onClick={() => cartDispatch(removeFromCart({ id: item.id }))}
            >
              <FontAwesomeIcon icon={faXmarkSquare} />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t-2 p-4 flex gap-2">
        <span className="font-bold">Total Price:</span>$
        {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </div>
      {cart.length !== 0 && <PaymentForm items={cart} product_id={""} />}
    </div>
  );
};

export default Cart;
