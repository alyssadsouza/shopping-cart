import items from "../data/items.json";
import { Item } from "../components/Item";
import { printPrice } from "../utils/currency";

export interface StoreProps {
  category: String;
}

export function Store({ category }: StoreProps) {
  return (
    <div className="p-[5%]">
      <h1 className="font-bold text-3xl">{category}</h1>
      <div className="flex flex-row items-center justify-between flex-wrap">
        {items.filter(item => category === 'All' || item.category === category).map(item => (
            <Item item={item} />
        ))}
      </div>
    </div>
  );
}
