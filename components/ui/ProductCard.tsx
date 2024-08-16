"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency  from "@/components/ui/Currency";
import IconButton  from "@/components/ui/IconButton";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";

interface ProductCard {
  data: Product | any
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };
  
  // stops the onClick on the product card's parent div from triggering
  const onPreview: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };
  // debugger
  // console.log("Test 3", data)
  return ( 
    <div onClick={onPreview} className="bg-white group cursor-pointer rounded-xl border p-3 space-x-4 relative min-w-fit">
      <div className="grid grid-cols-3 gap-4 w-full">
        {/* Image */}
        {/* {data.image && (
          <div className="min-w-24 min-h-24 h-24 aspect-square rounded-xl bg-gray-100 relative">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="aspect-square object-cover rounded-md"
            />
          </div>
        )} */}
        <div className="min-w-24 min-h-24 h-24 aspect-square rounded-xl bg-gray-100 relative">
            {/* <Image
              src={data.image}
              alt={data.name}
              fill
              className="aspect-square object-cover rounded-md"
            /> */}
          </div>
        {/* Description */}
        <div className="flex items-center ml-2">
          <p className="font-semibold text-lg">{data?.name}</p>
        </div>
        {/* Price & Review */}
        <div className="flex items-center">
          <Currency value={data?.price} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;