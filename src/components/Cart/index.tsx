import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Cart = () => {
  const cart: CartItemsProps[] = useSelector(
    (state: any) => state.cartReducer.items
  );
  return (
    <div className="flex flex-col bg-white absolute left-0 top-0 w-[400px] min-h-[500px]">
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-3xl text-center">Cart</h1>
        <FontAwesomeIcon icon={faXmarkSquare} />
      </div>
      <div className="p-4 opacity-80">
        {cart.length === 1 ? (
          <h1>Cart is Empty</h1>
        ) : (
          <h1> There is {cart.length - 1} items</h1>
        )}
      </div>
      <div className="flex flex-col p-4">
        {cart.slice(1).map((item: any) => (
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
              <h3 className="opacity-80">${item.price}</h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Quantity:</span>
                {item.quantity}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Size:</span>
                {item.size}
              </h3>
              <h3 className="flex gap-2">
                <span className="font-bold">Total:</span>$
                {item.quantity * item.price}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div>
        Total Price: ${ cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </div>
    </div>
  );
};

export default Cart;
