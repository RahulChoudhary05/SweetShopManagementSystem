"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Donut, Eye, EyeOff, Check, X } from "lucide-react"
import { register as apiRegister } from "../../services/api"

const PasswordStrength = ({ password }) => {
  const strength = {
    weak: password.length < 6,
    medium: password.length >= 6 && password.length < 12,
    strong: password.length >= 12,
  }

  const color = strength.strong ? "text-green-600" : strength.medium ? "text-yellow-600" : "text-red-600"

  return (
    <div className={`text-xs font-medium ${color}`}>
      {strength.strong ? "Strong" : strength.medium ? "Medium" : "Weak"}
    </div>
  )
}

export const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      showToast("Error", "Passwords do not match", "destructive")
      return
    }

    if (formData.password.length < 6) {
      showToast("Error", "Password must be at least 6 characters", "destructive")
      return
    }

    try {
      setLoading(true)
      const response = await apiRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      login(response.user, response.token)
      showToast("Success", "Your account has been created successfully")
      navigate("/dashboard")
    } catch (error) {
      showToast("Error", error.message, "destructive")
      console.error("[v0] Register error:", error)
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
              Create Account
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Join Sweet Shop and start exploring our delicious collection
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 text-base"
                  required
                />
              </div>

              <div className="auth-input-group">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
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
                  {formData.password && <PasswordStrength password={formData.password} />}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 text-base pr-10"
                    required
                    minLength={6}
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

              <div className="auth-input-group">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                    Confirm Password
                  </Label>
                  {formData.confirmPassword && (
                    <>
                      {formData.password === formData.confirmPassword ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                    </>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="auth-button w-full h-11 text-base font-semibold"
                disabled={loading || formData.password !== formData.confirmPassword}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            <div className="auth-footer">
              <p className="text-sm text-muted-foreground text-center">
                <Link to="/login" className="text-primary hover:underline font-semibold">
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground mt-6 space-y-2">
          <p>🔒 Your data is secure and encrypted</p>
          <p>✓ No credit card required</p>
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
