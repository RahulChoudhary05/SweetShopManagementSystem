"use client"

import React, { useState, useCallback, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

// ====================================================================
// Select Component - Added state management
// ====================================================================

const Select = ({ value, onValueChange, children, ...props }) => {
  const [open, setOpen] = useState(false)
  const selectRef = useRef(null)

  // Close when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  const handleTriggerClick = (e) => {
    e.preventDefault()
    setOpen(prev => !prev)
  }

  const handleSelectItem = (newValue) => {
    onValueChange?.(newValue)
    setOpen(false) // Close the dropdown on selection
  }

  return (
    <div className="relative" ref={selectRef} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        
        // Pass the open state and click handler to the Trigger
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { 
            value: value,
            onClick: handleTriggerClick,
            open: open, // Pass open state for visual feedback if needed
          })
        }
        
        // Only render SelectContent if 'open' is true
        if (child.type === SelectContent && open) {
          return React.cloneElement(child, { 
            onValueChange: handleSelectItem, // Pass the closing handler
          })
        }
        
        // Ignore SelectContent if not open
        if (child.type === SelectContent && !open) {
            return null;
        }

        return child
      })}
    </div>
  )
}

// ====================================================================
// SelectTrigger Component - Minor style updates
// ====================================================================

const SelectTrigger = ({ value, onClick, className = "", open = false, children }) => (
  <button
    type="button" // Important for forms!
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 border border-input rounded-lg bg-background text-foreground hover:bg-muted transition-colors ${className}`}
  >
    <div className="flex-1 text-left">{children}</div>
    {/* Rotate the icon based on the 'open' state */}
    <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
  </button>
)

// ====================================================================
// SelectValue Component
// ====================================================================

const SelectValue = ({ children, placeholder = "Select category" }) => (
    // Render the selected value or the placeholder
    <span>{children || placeholder}</span>
)

// ====================================================================
// SelectContent Component - Removed problematic absolute/fixed position logic
// Note: When inside a Dialog, you should ideally use the Radix Portal. 
// For this simple version, we'll keep the relative positioning, 
// which is causing the scrollbar issue you saw.
// To fix the visual issue, you should use the full Radix version.
// For now, let's ensure it closes.
// ====================================================================

const SelectContent = ({ children, onValueChange, className = "" }) => (
  <div
    className={`absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto ${className}`}
  >
    {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === SelectItem) {
            // Pass the onValueChange function down to each item
            return React.cloneElement(child, { onValueChange });
        }
        return child;
    })}
  </div>
)

// ====================================================================
// SelectItem Component - Added button type for better form handling
// ====================================================================

const SelectItem = ({ value, children, onValueChange }) => (
  <button
    type="button" // Important! Prevents form submission when clicked
    onClick={() => onValueChange?.(value)}
    className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-foreground text-sm"
  >
    {children}
  </button>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }