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
    <div onClick={onPreview} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src="/sample-picture.jpg"
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data?.name}</p>
        {/* <p className="text-sm text-gray-500">{data.category}</p> */}
        {/* Actions */}
        {/* <div className="opacity-0 group-hover:opacity-100 transition relative w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div>
        </div> */}
      </div>
      {/* Price & Review */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
}

export default ProductCard;