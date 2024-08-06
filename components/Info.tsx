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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  instructions: z.string().optional(),
  toppings: z.record(z.string().optional()),
  size: z.string(),
  quantity: z.number().min(1)
});

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    // You can also handle additional logic here, like updating the cart
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructions:"",
      toppings: {},
      size:"",
      quantity: 1
    },
  })

  const addOns: JSX.Element[] = [];
  const sizes: JSX.Element[] = [];
  const toppingsSet = new Set();
  
  const bannedAddOns = ["Well Done", 'Extra Cheese']
  const bannedToppings = ['Well Done','Small Pizza','Large Pizza']
  
  //getting toppings first
  for (const item of data.modifiers) {
    const toppingsArray = item.modifierListData.modifiers;
    for (const object of toppingsArray) {
      const topping = object.modifierData.name;
      if (!bannedToppings.includes(topping)) {
        toppingsSet.add(topping);
      }
    }
  }
  
//   const toppings = 
//   <RadioGroup 
//     className="grid grid-cols-3 gap-4"
//     {...form.register(`toppings`)}
//     >
//   {Array.from(toppingsSet).map(topping => (
//       <FormItem key={topping} className="flex items-center space-x-2">
//         <FormControl>
//           <RadioGroupItem value={topping} id={topping}/>
//         </FormControl>
//         <FormLabel htmlFor={topping} className="text-sm font-medium leading-none cursor-pointer">
//           {topping}
//         </FormLabel>
//       </FormItem>
//     // </div>
//   ))}
// </RadioGroup>

  //putting the toppings with approperiate heading
  for (const item of data.modifiers){
    const header = item.modifierListData.name
    if (!bannedAddOns.includes(header))
    addOns.push(
      <FormField
        key={header}
        control={form.control}
        name={`toppings.${header}`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-black">{header}</FormLabel>
            <FormControl>
            <RadioGroup 
                className="grid grid-cols-3 gap-4"
                onValueChange={(value) => form.setValue(`toppings.${header}`, value)}
                defaultValue={field.value}
                >
              {Array.from(toppingsSet).map(topping => (
                  <FormItem key={topping} className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value={topping}/>
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                      {topping}
                    </FormLabel>
                  </FormItem>
                // </div>
              ))}
            </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    )
  }

  for (const item of data.itemData.variations){
    const name = item.itemVariationData.name
    const price = <Currency value={item.itemVariationData.priceMoney.amount}/>
    sizes.push(
      <div key={name} className="flex space-x-2">
        <Checkbox
          id={name}
          value={name}
          // isChecked={checkedToppings.has(topping)}
          // onChange={() => handleCheckboxChange(topping)}
        />
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none cursor-pointer"
        >
          <span className='flex'>{name}: <Currency value={item.itemVariationData.priceMoney.amount}/></span>
        </label>
      </div>
    )
    // sizes.push(<p>{item.itemVariationData.name}:<Currency value={item.itemVariationData.priceMoney.amount}/></p>)
  }

  const onAddToCart = (formData: z.infer<typeof formSchema>) => {
    const cartData = { ...data, ...formData, quantity };
    console.log("Information being sent to cart", formData);
    cart.addItem(cartData);
  };

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddToCart)}>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col items-center gap-x-4">
              <h3 className="font-semibold text-black">Size:</h3>
              <div className='flex space-x-2'>
                {sizes}
              </div>
              <h3 className="font-semibold text-black">Extras:</h3>
              <div>
                {addOns}
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-black">Special Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any requests here."
                    className="border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5 flex items-center gap-x-3">
          <QuantitySelector initialQuantity={quantity} onChange={handleQuantityChange} />
            <Button type="submit" className="flex items-center gap-x-2">
              Add To Cart
              <ShoppingCart size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
 
export default Info;