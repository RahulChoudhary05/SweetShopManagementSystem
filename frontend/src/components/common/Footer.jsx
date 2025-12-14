import { Donut } from "lucide-react"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Donut className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Sweet Shop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Your premium destination for the finest selection of sweets, candies, and confectionery. Manage your
              inventory with ease and delight your customers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/sweets" className="hover:text-foreground transition-colors">
                  Browse Sweets
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            {currentYear} Sweet Shop Management System. Built with React & Node.js.
          </p>
        </div>
      </div>
    </footer>
  )
}
