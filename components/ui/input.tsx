import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants>  {}

interface CustomInputProps extends InputProps {
  variant?: "default" | "underline" | null;
  inputSize?: "default" | "sm" | "xs" | "lg" | null;
}

  const inputVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "flex rounded-md w-full border border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          underline: "border-b rounded-none bg-background ring-offset-0 !ring-0 outline-none", 
        },
        inputSize: {
          default: "h-10 px-3 py-2",
          sm: "h-8 px-3 py-2",
          xs: "h-6 px-2 py-2 text-xs",
          lg: "h-12 px-3 py-2",
        },
      },
      defaultVariants: {
        variant: "default",
        inputSize: "default",
      },
    }
  )

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
