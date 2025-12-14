"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
// import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { BarChart3, TrendingUp, Package, ShoppingCart, Users, DollarSign } from "lucide-react"
import { InventoryManagement } from "../components/admin/InventoryManagement"

export const Admin = () => {
  const { user, loading, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (!loading && !isAdmin?.()) {
      navigate("/")
    }
  }, [loading, isAdmin, navigate])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mb-4 mx-auto"></div>
            <p className="text-muted-foreground">Loading admin panel...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAdmin?.()) {
    return null
  }

  // Mock data for charts
  const orderStats = {
    completed: 145,
    processing: 23,
    shipped: 34,
    pending: 12,
  }

  const revenueData = {
    today: 1850,
    thisWeek: 12500,
    thisMonth: 48900,
    total: 156200,
  }

  const topProducts = [
    { name: "Chocolate Truffles", sales: 485, revenue: 12125 },
    { name: "Gummy Bears Mix", sales: 342, revenue: 4446 },
    { name: "Caramel Swirls", sales: 298, revenue: 2682 },
    { name: "Lollipops Assorted", sales: 267, revenue: 1603 },
  ]

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", amount: 124.99, status: "completed", date: "2024-01-15" },
    { id: "ORD002", customer: "Jane Smith", amount: 89.99, status: "processing", date: "2024-01-16" },
    { id: "ORD003", customer: "Bob Johnson", amount: 156.5, status: "shipped", date: "2024-01-16" },
    { id: "ORD004", customer: "Alice Brown", amount: 234.75, status: "pending", date: "2024-01-17" },
    { id: "ORD005", customer: "Charlie Wilson", amount: 87.25, status: "completed", date: "2024-01-17" },
  ]

  const adminStats = [
    {
      title: "Total Revenue",
      value: `$${revenueData.total.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: `+$${revenueData.thisMonth} this month`,
    },
    {
      title: "Total Orders",
      value: Object.values(orderStats).reduce((a, b) => a + b, 0),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: `${orderStats.completed} completed`,
    },
    {
      title: "Active Products",
      value: topProducts.length,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "Well stocked",
    },
    {
      title: "Total Customers",
      value: "847",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+12 this week",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="admin-header mb-8 animate-slide-in-down">
          <h1>Admin Dashboard</h1>
          <p>Monitor your sweet shop performance and manage operations</p>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-list mb-8">
          {["dashboard", "orders", "products", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tabs-trigger ${activeTab === tab ? "active" : ""}`}
            >
              {tab === "products" ? "Inventory" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              {adminStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-primary/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="card-header-flex">
                      <div>
                        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                        <div className="text-3xl font-bold mt-2">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
                      </div>
                      <div className={`stat-icon ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Status Chart */}
              <div className="admin-chart">
                <div className="chart-title flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Order Status Distribution
                </div>
                <div className="space-y-3">
                  {Object.entries(orderStats).map(([status, count]) => {
                    const total = Object.values(orderStats).reduce((a, b) => a + b, 0)
                    const percentage = Math.round((count / total) * 100)
                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">{status}</span>
                          <span className="text-sm font-bold text-primary">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-primary" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="admin-chart">
                <div className="chart-title flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Overview
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Today</p>
                    <p className="text-2xl font-bold text-primary">${revenueData.today}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p className="text-2xl font-bold text-primary">${revenueData.thisWeek.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-accent-light rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">This Month</p>
                    <p className="text-2xl font-bold text-primary">${revenueData.thisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <Card className="border-2">
              <CardHeader className="card-header">
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="font-semibold">{order.id}</td>
                          <td>{order.customer}</td>
                          <td className="text-primary font-bold">${order.amount.toFixed(2)}</td>
                          <td>
                            <span className={`order-status ${order.status}`}>{order.status}</span>
                          </td>
                          <td className="text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card className="border-2">
            <CardHeader className="card-header">
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="font-semibold">{order.id}</td>
                        <td>{order.customer}</td>
                        <td className="text-primary font-bold">${order.amount.toFixed(2)}</td>
                        <td>
                          <span className={`order-status ${order.status}`}>{order.status}</span>
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <Button className="btn-small btn-outline">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
  <div className="animate-fade-in">
    <InventoryManagement />
  </div>
)}


        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <Card className="border-2">
            <CardHeader className="card-header">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">Performance</h4>
                <p className="text-blue-800 text-sm">
                  Your store is performing 23% better than last month. Keep up the great work!
                </p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <h4 className="font-semibold text-green-900 mb-2">Revenue</h4>
                <p className="text-green-800 text-sm">Total revenue this month: $48,900 (+18% from last month)</p>
              </div>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                <h4 className="font-semibold text-orange-900 mb-2">Inventory Alert</h4>
                <p className="text-orange-800 text-sm">
                  5 products are running low on stock. Consider restocking soon.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
