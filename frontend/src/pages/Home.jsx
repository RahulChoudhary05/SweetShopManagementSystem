"use client"

import { useNavigate } from "react-router-dom"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Donut, ShoppingBag, TrendingUp, Shield, ArrowRight, Star, Users, Truck, Award } from "lucide-react"

export const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: ShoppingBag,
      title: "Easy Shopping Experience",
      description: "Browse, filter, and purchase premium sweets with just a few clicks. Fast checkout process.",
    },
    {
      icon: TrendingUp,
      title: "Smart Inventory Management",
      description: "Real-time stock tracking and analytics. Manage your products efficiently.",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Military-grade encryption protects all transactions and personal data.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick delivery to your doorstep. Track orders in real-time.",
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "24/7 dedicated support team ready to assist you anytime.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handpicked sweets from trusted suppliers worldwide.",
    },
  ]

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "5000+", label: "Products Sold" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sweet Shop Owner",
      text: "This platform transformed how I manage my business. Highly recommended!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Customer",
      text: "Amazing quality sweets and super fast delivery. Will definitely order again!",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Bulk Buyer",
      text: "Great prices and excellent customer service. Worth every penny.",
      rating: 5,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-in-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  <Donut className="h-4 w-4" />
                  Premium Confectionery Platform
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Your Sweet Shop, Perfected
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                  The ultimate e-commerce platform for your confectionery business. Manage inventory, delight customers,
                  and grow your business with our intuitive system.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button onClick={() => navigate("/sweets")} className="btn-primary text-base h-auto px-8 py-3 gap-2">
                    Browse Sweets <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button onClick={() => navigate("/register")} className="btn-outline text-base h-auto px-8 py-3">
                    Get Started
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  {stats.slice(0, 2).map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-float">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                  <div className="text-9xl">🍬</div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary/8 to-accent/12 border-y-2 border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Sweet Shop?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for a successful confectionery business in one powerful platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50 h-full animate-slide-in-up transition-all"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="pt-8">
                      <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Our Community</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our customers have to say about Sweet Shop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <Card key={i} className="border-2 bg-white dark:bg-card">
                  <CardContent className="pt-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-2">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of successful shop owners. Start free today, no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate("/register")} className="btn-primary h-auto px-8 py-3">
                    Create Free Account
                  </Button>
                  <Button onClick={() => navigate("/sweets")} className="btn-outline h-auto px-8 py-3">
                    Explore Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
