"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useSweets } from "../hooks/useSweets"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { ShoppingCart, TrendingUp, Settings, LogOut, Edit, User, Clock, CheckCircle } from "lucide-react"

export const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { sweets } = useSweets()
  const [activeTab, setActiveTab] = useState("overview")

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Please login to view dashboard</h2>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const mockOrders = [
    {
      id: "ORD001",
      items: [{ name: "Chocolate Truffles", qty: 2, price: 24.99 }],
      total: 49.98,
      date: "2024-01-15",
      status: "completed",
      deliveryDate: "2024-01-18",
    },
    {
      id: "ORD002",
      items: [{ name: "Gummy Bears Mix", qty: 1, price: 12.99 }],
      total: 12.99,
      date: "2024-01-16",
      status: "processing",
      deliveryDate: "Est. 2024-01-21",
    },
    {
      id: "ORD003",
      items: [
        { name: "Caramel Swirls", qty: 3, price: 8.99 },
        { name: "Lollipops Assorted", qty: 1, price: 5.99 },
      ],
      total: 31.96,
      date: "2024-01-10",
      status: "shipped",
      deliveryDate: "2024-01-17",
    },
  ]

  const stats = [
    {
      title: "Total Orders",
      value: mockOrders.length,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: `${mockOrders.length} orders placed`,
    },
    {
      title: "Total Spent",
      value: `$${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "Lifetime value",
    },
    {
      title: "Delivered Orders",
      value: mockOrders.filter((o) => o.status === "completed").length,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: "Successfully delivered",
    },
    {
      title: "In Progress",
      value: mockOrders.filter((o) => o.status !== "completed").length,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "Being processed",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
      processing: { bg: "bg-blue-100", text: "text-blue-800", label: "Processing" },
      shipped: { bg: "bg-purple-100", text: "text-purple-800", label: "Shipped" },
    }
    const config = statusConfig[status] || statusConfig.completed
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 animate-slide-in-down">
          <div className="dashboard-header">
            <div className="dashboard-header-flex">
              <div>
                <h1 className="dashboard-header h1 mb-2">Welcome back, {user?.name}! 👋</h1>
                <p className="text-lg text-muted-foreground">Manage your orders and account settings</p>
              </div>
              <Button onClick={() => setActiveTab("settings")} className="btn-ghost gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-list mb-8">
          {["overview", "orders", "profile", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tabs-trigger ${activeTab === tab ? "active" : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="dashboard-stats">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="stat-card" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="stat-header">
                      <div>
                        <div className="stat-label">{stat.title}</div>
                        <div className="stat-value">{stat.value}</div>
                      </div>
                      <div className={`stat-icon ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="stat-trend">{stat.trend}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Orders */}
            <Card className="border-2">
              <CardHeader className="card-header">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="p-4 border-2 border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="space-y-2 mb-3 pb-3 border-b border-border">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {item.qty}x {item.name} - ${item.price.toFixed(2)}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery: {order.deliveryDate}</p>
                        </div>
                        <p className="font-bold text-primary text-lg">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="animate-fade-in">
            <Card className="border-2">
              <CardHeader className="card-header">
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-4 border-2 rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        {getStatusBadge(order.status)}
                        <div className="text-right">
                          <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {order.items.map((item, idx) => (
                          <p key={idx}>
                            {item.qty}x {item.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="animate-fade-in">
            <Card className="border-2 max-w-2xl">
              <CardHeader className="card-header">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge className="bg-primary text-white mt-2">{user?.role?.toUpperCase()}</Badge>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Email Address</label>
                    <p className="text-lg font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Full Name</label>
                    <p className="text-lg font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Account Type</label>
                    <p className="text-lg font-medium capitalize">{user?.role}</p>
                  </div>
                </div>

                <Button className="btn-primary gap-2 w-full">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="animate-fade-in max-w-2xl">
            <Card className="border-2">
              <CardHeader className="card-header">
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter your current password"
                        className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter your new password"
                        className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm your new password"
                        className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <Button className="btn-primary">Update Password</Button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-lg mb-4">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                      <span className="text-sm">Email me about order updates</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                      <span className="text-sm">Email me about special offers</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="text-sm">Email me about new products</span>
                    </label>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-lg text-destructive mb-4">Danger Zone</h4>
                  <Button onClick={logout} className="w-full bg-destructive hover:bg-destructive/90 text-white gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
