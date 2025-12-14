import React from "react"

const Button = React.forwardRef(({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    ghost: "text-foreground hover:bg-muted focus:ring-primary",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <button ref={ref} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
})

Button.displayName = "Button"

export { Button }
