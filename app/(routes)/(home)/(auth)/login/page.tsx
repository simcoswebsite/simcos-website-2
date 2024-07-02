'use client'
// import { login, signup } from '../actions'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link'
 
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

const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password:z.string().min(8, {
    message: 'Password must be at least 8 characters long'
  })
});

export default function LogInPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      // await login(values);
      console.error("Test");
    } catch (error) {
      console.error("Error during log-up:", error);
    }
  }

  return (
    <div className='w-full h-full px-6'>
      <div className='flex justify-between py-3'>
        <h1 className={`text-[20px] ${robotoCondensed.className}`}>Login</h1>
        {/* <p className={`text-[16px] text-[#EF370D] underline ${robotoBold.className}`}>Sign In</p> */}
      </div>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput {...field} id="email" label={
                  <span>
                    Email
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
                    Password
                  </span>
                }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between py-3'>
          <SimcosButton variant={"auth"} type="submit">Log-In</SimcosButton>
          <Link href='/reset'>
            <p className={`text-[13px] ${roboto.className} underline`}>Forgot Password?</p>
          </Link>
        </div>
      </form>
    </Form>
    </div>
  )
}