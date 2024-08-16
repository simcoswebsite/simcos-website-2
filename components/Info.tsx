"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/Button";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuantitySelector from "./ui/QuantitySelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { v4 as uuidv4 } from 'uuid'

const createFormSchema = (toppingsNumber: number, requiresSize: boolean, requiresFlavor: boolean, requiresPreparation: boolean) => {
  return z.object({
    instructions: z.string().optional(),
    toppings: z.record(z.string()).refine(
      (toppings) => Object.keys(toppings).length === toppingsNumber,
      {
        message: `You must select ${toppingsNumber} topping(s).`,
      }
    ),
    size: requiresSize ? z.string().min(1, "Size is required") : z.string().optional(),
    flavor: requiresFlavor ? z.string().min(1, "Flavor is required") : z.string().optional(),
    substitution: z.string().optional(),
    preparation: requiresPreparation ? z.string().min(1, "Preparation is required") : z.string().optional(),
    quantity: z.number().min(1),
  });
};

type FormSchemaType = z.infer<ReturnType<typeof createFormSchema>>;

interface InfoProps {
  data: Product | any;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    // You can also handle additional logic here, like updating the cart
  };

  const toppingsNumber = data?.toppingsNumber || 0;
  const requiresSize = !!data?.sizes?.length;
  const requiresFlavor = !!data?.flavors?.length;
  const requiresPreparation = !!data?.preparation?.length;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(createFormSchema(toppingsNumber, requiresSize, requiresFlavor, requiresPreparation)),
    defaultValues: {
      instructions: "",
      toppings: {},
      size: "",
      flavor: "",
      substitution: "",
      preparation: "",
      quantity: 1,
    },
  });
  console.log(data);

  //Steps
  // iterate over the toppings if there are any and make them Radio Checkboxes
  // Do the same for anything in an array in the JSON file
  const sizes = data?.sizes;

  const Sizes: React.FC<{ sizes?: string[] }> = ({ sizes = [] }) => {
    if (sizes.length === 0) return null;
    return (
      <>
        {sizes.map((size, index) => (
          <FormItem key={index} className="items-center space-x-2 space-y-0">
            <FormControl>
              <RadioGroupItem value={size} id={`size-${index}`} />
            </FormControl>
            <FormLabel className="font-normal" htmlFor={`size-${index}`}>
              {size}
            </FormLabel>
          </FormItem>
        ))}
      </>
    );
  };

  const toppings = data?.toppings;

  const Toppings: React.FC<{ toppings?: string[] }> = ({ toppings = [] }) => {
    if (toppings.length === 0) return null;
    return (
      <>
        {toppings.map((topping, index) => (
          <FormItem key={index} className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value={topping} id={`topping-${index}`} />
            </FormControl>
            <FormLabel
              className="text-sm font-medium leading-none cursor-pointer"
              htmlFor={`topping-${index}`}
            >
              {topping}
            </FormLabel>
          </FormItem>
        ))}
      </>
    );
  };

  const toppingsGroupLabel = {
    0: "",
    1: "Second",
    2: "Third",
    3: "Fourth",
  };

  const ToppingsGroup: React.FC<{ toppingsNumber?: number }> = ({
    toppingsNumber = 0,
  }) => {
    return (
      <>
        {Array.from({ length: toppingsNumber }, (_, i) => (
          <FormField
            control={form.control}
            name={`toppings`}
            key={i}
            render={({ field }) => (
              <FormItem>
                {/* TODO: Change it so that the categories match up */}
                <FormLabel className="font-semibold text-black">{`Choose a ${toppingsGroupLabel[i]} Topping -REQUIRED`}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      // Ensure we are working with a defined object
                      const updatedToppings = { ...field.value, [i]: value };
                      field.onChange(updatedToppings);
                    }}
                    defaultValue={field.value[i]} // Avoid undefined access
                    className="grid grid-cols-3 gap-4"
                  >
                    <Toppings toppings={toppings} />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </>
    );
  };

  const flavors = data?.flavors;

  const Flavors: React.FC<{ flavors?: string[] }> = ({ flavors = [] }) => {
    if (flavors.length === 0) return null;
    return (
      <>
        <FormLabel className="font-semibold text-black">{`Choose your flavor -REQUIRED`}</FormLabel>
        {flavors.map((flavor, index) => (
          <FormItem
            key={index}
            className="flex items-center space-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem value={flavor} id={`flavor`} />
            </FormControl>
            <FormLabel className="text-sm font-medium leading-none cursor-pointer" htmlFor={`flavor`}>
              {flavor}
            </FormLabel>
          </FormItem>
        ))}
      </>
    );
  };

  const substitutions = data?.substitutions;
  const Substitutions: React.FC<{ substitutions?: string[] }> = ({
    substitutions = [],
  }) => {
    if (substitutions.length === 0) return null;

    return (
      <>
        <FormLabel className="font-semibold text-black">{`Please select a bread substitution if you'd like one`}</FormLabel>
        {substitutions.map((substitution, index) => (
          <FormItem
            key={index}
            className="flex items-center space-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem
                value={substitution}
                id={`substitution`}
              />
            </FormControl>
            <FormLabel
              className="font-normal"
              htmlFor={`substitution`}
            >
              {substitution}
            </FormLabel>
          </FormItem>
        ))}
      </>
    );
  };

  const preparations = data?.preparation;
  const Preparations: React.FC<{ preparations?: string[] }> = ({
    preparations = [],
  }) => {
    if (preparations.length === 0) return null;

    return (
      <>
        <FormLabel className="font-semibold text-black">{`Choose your Preparation -REQUIRED`}</FormLabel>
        {preparations.map((preparation, index) => (
          <FormItem
            key={index}
            className="flex items-center space-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem value={preparation} id={`preparation`} />
            </FormControl>
            <FormLabel className="font-normal" htmlFor={`preparation`}>
              {preparation}
            </FormLabel>
          </FormItem>
        ))}
      </>
    );
  };

  const onAddToCart = (formData: z.infer<typeof formSchema>) => {
    const uniqueId = uuidv4()
    const uniqueData = { ...formData, uniqueId: uniqueId }
    const cartData = { ...data, ...uniqueData, quantity };
    //CRUCIAL: this is where the unique keys are generated
    console.log("Information being sent to cart", cartData);
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
              <div className="flex space-x-2 items-center justify-center">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex"
                        >
                          <Sizes sizes={sizes} />
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="flavor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        <Flavors flavors={flavors} />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="substitution"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Substitutions substitutions={substitutions} />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preparation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <Preparations preparations={preparations} />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <ToppingsGroup toppingsNumber={data.toppingsNumber} />
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-black">
                  Special Instructions
                </FormLabel>
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
            {/* <QuantitySelector
              initialQuantity={quantity}
              onChange={handleQuantityChange}
            /> */}
            <Button type="submit" className="flex items-center gap-x-2">
              Add To Cart
              <ShoppingCart size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Info;
