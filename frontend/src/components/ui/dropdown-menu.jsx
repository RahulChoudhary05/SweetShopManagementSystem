"use client"

import React, { useState } from "react"

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) })
        }
        if (child.type === DropdownMenuContent) {
          return isOpen ? React.cloneElement(child, { onClose: () => setIsOpen(false) }) : null
        }
        return child
      })}
    </div>
  )
}

const DropdownMenuTrigger = ({ asChild, onClick, children, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick, ...props })
  }
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const DropdownMenuContent = ({ align = "start", className = "", children, onClose }) => (
  <div
    className={`absolute ${align === "end" ? "right-0" : "left-0"} mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-48 ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
)

const DropdownMenuLabel = ({ children, className = "" }) => (
  <div className={`px-2 py-1.5 text-sm font-semibold text-foreground ${className}`}>{children}</div>
)

const DropdownMenuItem = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 ${className}`}
  >
    {children}
  </button>
)

const DropdownMenuSeparator = () => <div className="my-1 border-t border-border" />

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
