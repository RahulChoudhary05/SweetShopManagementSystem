"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

const Select = ({ value, onValueChange, children, ...props }) => {
  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { value })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, { onValueChange })
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = ({ value, onClick, className = "", children }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 border border-input rounded-lg bg-background text-foreground hover:bg-muted transition-colors ${className}`}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
)

const SelectValue = ({ children, placeholder = "Select..." }) => <span>{children || placeholder}</span>

const SelectContent = ({ children, onValueChange, className = "" }) => (
  <div
    className={`absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 ${className}`}
  >
    {children}
  </div>
)

const SelectItem = ({ value, children, onValueChange }) => (
  <button
    onClick={() => onValueChange?.(value)}
    className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-foreground text-sm"
  >
    {children}
  </button>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
