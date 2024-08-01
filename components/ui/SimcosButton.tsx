import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        auth: "bg-[#EF370D] text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        simcos:
          "bg-[#EBD6B7] text-[#EF370D] text-[20px] rounded-full border-[0.3125rem] border-solid border-[#EF370D] hover:bg-[#EBD6B7]/90",
        filter: "bg-[#EFEFEF] text-primary-foreground hover:bg-[#EF370D]/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "pt-6 pb-5 px-3 h-15",
        nav:"px-4 py-1 ml-10",
        item: "h-11 w-11",
        tile: "h-29 w-29"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SimcosButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const SimcosButton = React.forwardRef<HTMLButtonElement, SimcosButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
SimcosButton.displayName = "Simcos Button"

export { SimcosButton, buttonVariants }
