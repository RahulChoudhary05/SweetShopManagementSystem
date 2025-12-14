"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Package, TrendingUp, DollarSign, AlertCircle } from "lucide-react"
import { getSweets } from "../../services/api"
import { formatPrice } from "../../utils/helpers"

export const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const sweets = await getSweets()
        const totalProducts = sweets.length
        const totalValue = sweets.reduce((sum, sweet) => sum + sweet.price * sweet.quantity, 0)
        const lowStock = sweets.filter((s) => s.quantity > 0 && s.quantity < 20).length
        const outOfStock = sweets.filter((s) => s.quantity === 0).length
        setStats({ totalProducts, totalValue, lowStock, outOfStock })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Inventory Value",
      value: formatPrice(stats.totalValue),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Low Stock Items",
      value: stats.lowStock,
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your sweet shop today.</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Admin Dashboard
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border-2 border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer hover:bg-muted/50">
              <h4 className="font-semibold mb-1">Manage Inventory</h4>
              <p className="text-sm text-muted-foreground">View and update your product inventory</p>
            </div>
            <div className="p-4 border-2 border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer hover:bg-muted/50">
              <h4 className="font-semibold mb-1">Add New Product</h4>
              <p className="text-sm text-muted-foreground">Create a new sweet item</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
