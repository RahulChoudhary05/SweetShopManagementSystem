"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Button } from "../ui/button"
import {
  Donut,
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

export const Header = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const [cartCount] = useState(0)

  const handleLogout = () => {
    logout()
    navigate("/login")
    setShowDropdown(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
        >
          <Donut className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">Sweet Shop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/sweets" className="nav-link">
            Sweets
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
          {isAdmin() && (
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          )}

          {isAuthenticated ? (
            <div className="profile-wrapper" ref={dropdownRef}>
              {/* Avatar Button */}
              <button
                className="profile-trigger"
                onClick={() => setShowDropdown((p) => !p)}
              >
                <User className="h-5 w-5" />
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>

                  <div className="profile-divider" />

                  <button
                    onClick={() => {
                      navigate("/dashboard")
                      setShowDropdown(false)
                    }}
                    className="profile-dropdown-item"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </button>

                  {isAdmin() && (
                    <button
                      onClick={() => {
                        navigate("/admin")
                        setShowDropdown(false)
                      }}
                      className="profile-dropdown-item"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin Panel
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="profile-dropdown-item danger"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
