import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/IconButton";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";


interface CartItemProps {
  data: Product | any;
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();

  const filterEmptyValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== '' && value != null)
    );
  };

  const cleanedData = filterEmptyValues(data)

  const onRemove = () => {
    cart.removeItem(data.uniqueId);
  };
console.log("CART INFO", data)
  return ( 
    <li className="flex py-6 border-b">
      {/* Image */}
      <div className="relative h-24 w-24 rounded-md bg-slate-600 overflow-hidden sm:h-48 sm:w-48">
        {/* <Image
          fill
          src="/simcos-logo.png"
          alt=""
          className="object-cover object-center"
        /> */}
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {cleanedData.name}
            </p>
          </div>

          {/* INFO ABOUT ITEM */}
          <div className="mt-1 flex text-sm">
            {/* <p className="text-gray-500">Blue</p> */}
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{cleanedData?.size}</p>
          </div>
          <Currency value={cleanedData.price} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          {cleanedData.toppings && (
              <div>
                {Object.values(cleanedData.toppings).map((topping, index) => (
                  <div key={index}>
                    <p className="text-gray-500">{topping}</p> {/* Render each topping in a <p> tag */}
                  </div>
                ))}
              </div>
            )}
          <p className="text-gray-500">{cleanedData?.flavor}</p>
          <p className="text-gray-500">{cleanedData?.preparation}</p>
          <p className="text-gray-500">{cleanedData?.substitution}</p>
          <p className="text-gray-500">Special Instructions: {cleanedData?.instructions}</p>
        </div>
      </div>
    </li>
  );
}
 
export default CartItem;

/**
 * 1) From the data passed in, create a new object with no empty values
 * 2) The remaining values will simply be  listed in a list for display
 */