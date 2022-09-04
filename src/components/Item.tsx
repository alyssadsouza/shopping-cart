import { Link } from "react-router-dom";
import { printPrice } from "../utils/currency";
import { truncateText } from "../utils/truncateText";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export interface ItemProps {
  item: Item;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
  desc: string;
}

export function Item({ item }: ItemProps) {
  return (
    <div
      key={item.id}
      className="flex flex-col flex-wrap justify-start border-b p-[2%] my-4 w-[30%] min-h-96 bg-white shadow-md"
    >
      <img src={item.imgUrl} className="h-32"></img>
      <div className="flex flex-col items-start justify-between w-full my-4">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col items-start justify-start mx-[2%] w-full">
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-xs">{truncateText(50, item.desc)}</p>
          </div>
        </div>
        <h3 className="font-bold text-gray-500 text-lg my-4 w-full text-right">{printPrice(item.price)}</h3>
        <div className="flex flex-row items-center justify-between w-full mx-[2%]">
          <div>
            <p className="text-xs">Quantity:</p>
            <div className="flex flex-row items-center justify-between">
              <MinusCircleIcon className="w-5 h-5 mr-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-all" />
              <p>1</p>
              <PlusCircleIcon className="w-5 h-5 ml-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-all" />
            </div>
          </div>
          <div
            className="block px-4 py-2 w-fit text-sm bg-indigo-300 text-white border border-indigo-300 hover:bg-white hover:text-indigo-400 transition-all"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
