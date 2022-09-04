import { Link } from "react-router-dom";
import storeItems from "../data/items.json";
import { printPrice } from "../utils/currency";
import { truncateText } from "../utils/truncateText";
import {
  TrashIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useShoppingCart } from "../context/CartContext";

type StoreProps = {
  preview?: boolean;
};

export function Cart({ preview }: StoreProps) {
  const {
    cartItems,
    getCartItemsFromStore,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getCartTotal
  } = useShoppingCart();

  const items = getCartItemsFromStore();

  return (
    <div className="overflow-auto p-[5%] bg-white">
      <h1 className="font-bold text-3xl">Your Cart</h1>
      <div className="mt-[5%] border-t">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-row justify-start border-b p-[2%] my-0"
          >
            <img
              src={item.imgUrl}
              className={`mr-4 ${preview ? "w-32 h-32" : "w-64 h-64"}`}
            ></img>
            <div className="flex flex-col items-start justify-between w-full">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col items-start justify-start mx-[2%] w-full">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-xs">
                    {preview ? truncateText(50, item.desc) : item.desc}
                  </p>
                </div>
                <TrashIcon
                  onClick={() => removeFromCart(item.id)}
                  className={`${
                    preview ? "w-6 h-6" : "w-8 h-8"
                  } m-0 cursor-pointer text-gray-400 hover:text-gray-600 transition-all`}
                />
              </div>
              <div className="flex flex-row items-center justify-between w-full m-[2%]">
                <div>
                  <p className={`${preview ? "text-xs" : "text-sm"}`}>
                    Quantity:
                  </p>
                  <div className="flex flex-row items-center justify-between">
                    <MinusCircleIcon onClick={() => decreaseCartQuantity(item.id)} className="w-5 h-5 mr-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-all" />
                    <p className="text-sm">{getItemQuantity(item.id)}</p>
                    <PlusCircleIcon onClick={() => increaseCartQuantity(item.id)} className="w-5 h-5 ml-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-all" />
                  </div>
                </div>
                <div>
                  <p
                    className={`text-right ${preview ? "text-xs" : "text-sm"}`}
                  >
                    Cost:
                  </p>
                  <h3 className="font-bold text-gray-500">
                    {printPrice(item.price * getItemQuantity(item.id))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-end w-full my-[5%]">
        <h3 className="text-lg text-right">Your total:</h3>
        <h2 className="font-bold text-2xl text-right mx-2">
          {printPrice(getCartTotal())}
        </h2>
      </div>
      {!preview && (
        <div className="flex flex-row w-full justify-end">
          <Link
            to="/checkout"
            className="block px-4 py-2 w-fit text-md bg-white text-gray-700 border hover:border-indigo-300 hover:text-indigo-400 transition-all"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
