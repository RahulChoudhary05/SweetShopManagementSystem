import React from "react"

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
))

Input.displayName = "Input"

export { Input }
