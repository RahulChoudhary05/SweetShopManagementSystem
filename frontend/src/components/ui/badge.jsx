const Badge = ({ className = "", variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary-foreground",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
