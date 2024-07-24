"use client";

import React, { useState } from 'react';
import { ShoppingCart } from "lucide-react";

import Currency  from "@/components/ui/Currency";
import Button from "@/components/ui/Button";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import QuantitySelector from "./ui/QuantitySelector";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  }

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    // You can also handle additional logic here, like updating the cart
  }

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {/* {data?.size?.value} */}
          </div>
          <h3 className="font-semibold text-black">Extras:</h3>
          <div>
            {/* {data?.size?.value} */}
          </div>
        </div>
        {/* <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
        </div> */}
      </div>
      <div className="mt-5 flex flex-col gap-x-3">
        <Label className="font-semibold text-base text-black" htmlFor="instructions">Special Instructions:</Label> 
        <Textarea className="border-black" placeholder="Add any requests here." id="instructions"/>
      </div>
      <div className="mt-5 flex items-center gap-x-3">
      <QuantitySelector initialQuantity={quantity} onChange={handleQuantityChange} />
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
}
 
export default Info;