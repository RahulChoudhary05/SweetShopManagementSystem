"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Donut, Eye, EyeOff } from "lucide-react"
import { login as apiLogin } from "../../services/api"

export const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "user@sweetshop.com",
    password: "user123",
  })
  const [loading, setLoading] = useState(false)

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await apiLogin(formData)
      login(response.user, response.token)
      showToast("Success", "You have successfully logged in")
      navigate(response.user.role === "admin" ? "/admin" : "/dashboard")
    } catch (error) {
      showToast("Error", error.message, "destructive")
      console.error("[v0] Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center">
              <Donut className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-primary">Sweet Shop</span>
          </div>
        </div>

        <Card className="auth-card shadow-2xl border-2 border-primary/20">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to your account and explore delicious sweets
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 text-base"
                  required
                />
              </div>

              <div className="auth-input-group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-primary hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="auth-button w-full h-11 text-base font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">or continue with demo</span>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Demo Accounts:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-white rounded hover:bg-primary/5 transition-colors">
                  <div>
                    <p className="font-medium">Admin Account</p>
                    <p className="text-xs text-muted-foreground">admin@sweetshop.com</p>
                  </div>
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">admin123</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded hover:bg-primary/5 transition-colors">
                  <div>
                    <p className="font-medium">User Account</p>
                    <p className="text-xs text-muted-foreground">user@sweetshop.com</p>
                  </div>
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">user123</code>
                </div>
              </div>
            </div>

            <div className="auth-footer mt-6">
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Create one free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>🔒 Your data is secure and encrypted</p>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed bottom-4 right-4 p-4 bg-card border-2 rounded-lg shadow-lg animate-slide-in-up ${
            toast.variant === "destructive" ? "border-destructive" : "border-primary"
          }`}
        >
          <p className="font-semibold text-sm">{toast.title}</p>
          <p className="text-xs text-muted-foreground">{toast.description}</p>
        </div>
      )}
    </div>
  )
}
