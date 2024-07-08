"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart";

import Button from "@/components/ui/Button";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="ml-auto flex items-center gap-x-4">
      <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-white px-2 lg:px-4 py-2">
        <ShoppingBag
          size={20}
          color="black"
        />
        <span className="ml-2 text-sm font-medium text-black">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
}
 
export default NavbarActions;