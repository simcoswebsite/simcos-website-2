'use client'
// import { login, signup } from '../actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { SimcosButton } from "@/components/ui/SimcosButton"
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
import { roboto, robotoCondensed, robotoBold} from '@/fonts'
import { FloatingLabelInput } from '@/components/ui/floating-label-input';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password:z.string().min(8, {
    message: 'Password must be at least 8 characters long'
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 characters.",
  }),
  enableEmails: z.boolean().default(false).optional(),
  enableTexts: z.boolean().default(false).optional()
});

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      phoneNumber:"",
      enableEmails: false,
      enableTexts: true
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // await signup(values);
      console.error("test",values);
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  }

  return (
    <div className='w-full h-full px-6'>
      <div className='flex justify-between py-3'>
        <h1 className={`text-[20px] ${robotoCondensed.className}`}>Contact Information</h1>
        <Link href="/login">
          <p className={`text-[16px] text-[#EF370D] underline ${robotoBold.className}`}>Sign In</p>
        </Link>
      </div>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput {...field} id="firstName" label={
                  <span>
                    First Name <span className='text-[#EF370D] pl-2'>*</span>
                  </span>
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput {...field} id="lastName" label={
                  <span>
                    Last Name <span className='text-[#EF370D] pl-2'>*</span>
                  </span>
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput {...field} id="email" label={
                  <span>
                    Email <span className='text-[#EF370D] pl-2'>*</span>
                  </span>
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput {...field} id="password" label={
                  <span>
                    Password <span className='text-[#EF370D] pl-2'>*</span>
                  </span>
                }/>
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
                <FloatingLabelInput {...field} id="phoneNumber" label={
                  <span>
                    Mobile Phone Number <span className='text-[#EF370D] pl-2'>*</span>
                  </span>
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableEmails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='rounded-s-md h-[28px] w-[31px] border-2 border-black'
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className={`text-[16px] ${roboto.className}`}>
                Sign me up for Simco’s emails including a FREE welcome appetizer coupon, a FREE desert for my birthday, special offers and more.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableTexts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='rounded-s-md h-[28px] w-[31px] border-2 border-black'
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className={`text-[16px] ${roboto.className}`}>
                Receive order info via text messages. This feature will allow the restaurant to be notified of your arrival via text. Message and data rates may apply.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <SimcosButton variant={"auth"} type="submit">Sign-Up!</SimcosButton>
      </form>
    </Form>
    </div>
  )
}