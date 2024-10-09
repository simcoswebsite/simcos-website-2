"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitOrder, submitPayment } from "./actions/actions";
import Container from "@/components/ui/Container";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Summary from './components/Summary'
import { useEffect } from "react";
import useCart from "@/hooks/useCart";


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 2 characters.",
  }),
  postalCode: z.string().min(5, {
    message: "Postal Code must be at least 5 characters.",
  }),
})

export default function Checkout() {
  
  const cartTotal = useCart((state) => state.cartTotal);
  const items = useCart((state) => state.items);
  // Replace with your application ID and location ID
  // const appId = process.env.SQUARE_APPLICATION_ID;
  const appId = 'sandbox-sq0idb-eFWIML_iUHk3zklfjNUKFw';
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phoneNumber:"",
      postalCode: ""
    },
  })
  console.log("Cart Items", items)
  console.log("Cart Total", cartTotal)


  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

  const lineItems = items.map((item) => {
    console.log("Before manipulation", item);
  
    // Ensure item.sizes is defined and is an array before using indexOf
    const sizeIndex = Array.isArray(item.sizes) ? item.sizes.indexOf(item.size) : -1;
    const price = sizeIndex !== -1 && Array.isArray(item.sizesPrice) ? item.sizesPrice[sizeIndex] : item.price;
  
    // Construct modifiers array with toppings, flavor, substitution, and preparation
    const modifiers = [
      ...(item.toppings && Object.values(item.toppings).length > 0
        ? Object.values(item.toppings).map((topping) => ({
            name: topping,
            basePriceMoney: {
              amount: 0,
              currency: 'USD',
            },
          }))
        : []),
      ...(item.flavor
        ? [
            {
              name: `Flavor: ${item.flavor}`,
              basePriceMoney: {
                amount: 0,
                currency: 'USD',
              },
            },
          ]
        : []),
      ...(item.substitution
        ? [
            {
              name: `Substitution: ${item.substitution}`,
              basePriceMoney: {
                amount: 0,
                currency: 'USD',
              },
            },
          ]
        : []),
      ...(item.preparation
        ? [
            {
              name: `Preparation: ${item.preparation}`,
              basePriceMoney: {
                amount: 0,
                currency: 'USD',
              },
            },
          ]
        : []),
    ];
  
    return {
      name: item.name,
      quantity: `${item.quantity}`,
      itemType: 'ITEM',
      ...(item.instructions && { note: item.instructions }),
      ...(item.size && { variationName: item.size }),
      modifiers,
      basePriceMoney: {
        amount: price,
        currency: 'USD',
      },
    };
  });
  console.log("Line Items Array",lineItems)

  const finalPrice = lineItems.reduce((total, item) => {
    return total + Number(item.basePriceMoney.amount)
  }, 0)

  return (
    <Container>
      <h1 className="text-xl font-bold text-black">Review Order and Submit Payment</h1>
      {/* <Summary /> */}
      {/* TODO: Add Payment summary here */}
      {/* TODO: Add Toast confirmation and email confirmation */}
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
      <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={async (token) => {
          const isValid = await form.trigger();
          if (isValid) {
            const formData = form.getValues();
            onSubmit(formData);
            const result = await submitPayment(token.token, finalPrice, lineItems);
            // const orderResult = await submitOrder()
            console.log("Payment result:", result);
            // console.log("Order Result", orderResult);
          } else {
            console.log("Form validation failed");
          }
        }}
      >
        <CreditCard />
      </PaymentForm>
    </Container>
  );
}