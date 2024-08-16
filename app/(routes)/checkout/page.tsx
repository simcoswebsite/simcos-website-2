"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

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
            const result = await submitPayment(token.token);
            console.log("Payment result:", result);
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