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
  data: Product | any
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
  console.log(data)

  //Steps
  // iterate over the toppings if there are any and make them Radio Checkboxes
  // Do the same for anything in an array in the JSON file
  const sizes = data?.sizes

  const Sizes: React.FC<{ sizes?: string[]}>= ({ sizes = [] }) => {
    return (
      <> 
        {sizes.length > 0 ? (
          sizes.map((size, index) => (
            <FormItem key={index} className="items-center space-x-2 space-y-0">
              <FormControl>
                <RadioGroupItem value={size} id={`size-${index}`} />
              </FormControl>
              <FormLabel className="font-normal" htmlFor={`size-${index}`}>
                {size}
              </FormLabel>
            </FormItem>
          ))
        ) : (
          <p>No sizes available.</p>
        )}
      </>
    );
  };
  
  const toppings = data?.toppings
  
  const Toppings: React.FC<{ toppings?: string[]}>= ({ toppings = [] }) => {
    if (toppings.length === 0) return null
    return (
      <> 
        {toppings.map((topping, index) => (
            <FormItem key={index} className="flex items-center space-x-2">
              <FormControl>
                <RadioGroupItem value={topping} id={`topping-${index}`} />
              </FormControl>
              <FormLabel className="text-sm font-medium leading-none cursor-pointer" htmlFor={`topping-${index}`}>
                {topping}
              </FormLabel>
            </FormItem>
          ))}
      </>
    );
  };

  const toppingsNumber = data?.toppingsNumber

  const toppingsGroupLabel = {
    0: "",
    1: "Second",
    2: "Third",
    3: "Fourth"
  }

  const ToppingsGroup: React.FC<{ toppingsNumber?: number}>= ({toppingsNumber = 1})=> {
    return(
      <>
        {Array.from({ length: toppingsNumber }, (_, i) => (
          <FormField
          control={form.control}
          name={`toppings-${i}`}
          render={({ field }) => (
            <FormItem>
              {/* TODO: Change it so that the categories match up */}
              <FormLabel className="font-semibold text-black">{`Choose a ${toppingsGroupLabel[i]} Topping`}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-4"
                >
                  <Toppings toppings={toppings}/>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        ))}
      </>
    )
  }

  const flavors = data?.flavors

  const Flavors: React.FC<{ flavors?: string[]}>= ({ flavors = [] }) => {
    if (flavors.length === 0) return null
    return (
      <> 
        {flavors.map((flavor, index) => (
            <FormItem key={index} className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={flavor} id={`flavor-${index}`} />
              </FormControl>
              <FormLabel className="font-normal" htmlFor={`flavor-${index}`}>
                {flavor}
              </FormLabel>
            </FormItem>
          ))}
      </>
    );
  };

  const substitutions = data?.substitutions
  const Substitutions: React.FC<{ substitutions?: string[]}>= ({ substitutions = [] }) => {
    if (substitutions.length === 0) return null

    return (
      <> 
        {substitutions.map((substitution, index) => (
            <FormItem key={index} className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={substitution} id={`substitution-${index}`} />
              </FormControl>
              <FormLabel className="font-normal" htmlFor={`substitution-${index}`}>
                {substitution}
              </FormLabel>
            </FormItem>
          ))}
      </>
    );
  };

  const preparations = data?.preparation
  const Preparations: React.FC<{ preparations?: string[]}>= ({ preparations = [] }) => {
    if (preparations.length === 0) return null

    return (
      <> 
        {preparations.map((preparation, index) => (
            <FormItem key={index} className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value={preparation} id={`preparation-${index}`} />
              </FormControl>
              <FormLabel className="font-normal" htmlFor={`preparation-${index}`}>
                {preparation}
              </FormLabel>
            </FormItem>
          ))}
      </>
    );
  };

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
          <div className="flex flex-col gap-y-6 border-green-500 border-2">
            <div className="flex flex-col items-center gap-x-4 border-blue-500 border-2">
              <h3 className="font-semibold text-black">Size:</h3>
              <div className='flex space-x-2 border-red-500 border-2 items-center justify-center'>
              <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <Sizes sizes={sizes}/>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              </div>
              <FormField
          control={form.control}
          name="flavors"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <Flavors flavors={flavors}/>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="substitutions"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <Substitutions substitutions={substitutions}/>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preparations"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <Preparations preparations={preparations}/>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              <h3 className="font-semibold text-black">Extras:</h3>
              <div>
                <ToppingsGroup toppingsNumber={data.toppingsNumber}/>
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