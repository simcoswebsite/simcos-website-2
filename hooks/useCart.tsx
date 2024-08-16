import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface CartStore {
  items: Product[] | any[];
  addItem: (data: any) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: any) => {
    //TODO:Add a loop to count for the quantity of the item
    //check the quantity first on the type:Product object, then add the item x times
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    //TODO: Add this back ASAP once finished with add-ons
    // if (existingItem) {
    //   return toast('Item already in cart.');
    // }

    set({ items: [...get().items, data] });
    toast.success('Item added to cart.');
  },
  removeItem: (uniqueId: string) => {
    set({ items: [...get().items.filter((item) => item.uniqueId !== uniqueId)] });
    toast.success('Item removed from cart.');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;