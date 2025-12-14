"use client"
import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  getSweets,
  updateSweet,
  deleteSweet,
  createSweet,
  restockSweet,
} from "../../services/api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { SweetForm } from "../sweets/SweetForm"
import { LoadingSpinner } from "../common/LoadingSpinner"
import {
  formatPrice,
  getStockStatus,
  getStockStatusColor,
} from "../../utils/helpers"
import { useToast } from "../../hooks/use-toast"

export const InventoryManagement = () => {
  const { token } = useAuth()
  const { toast } = useToast()

  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isRestockOpen, setIsRestockOpen] = useState(false)

  const [selectedSweet, setSelectedSweet] = useState(null)
  const [restockQuantity, setRestockQuantity] = useState("")

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const data = await getSweets()
      setSweets(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch sweets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  const handleCreate = async (data) => {
    try {
      setSubmitting(true)
      await createSweet(data, token)
      toast({ title: "Sweet created successfully" })
      setIsCreateOpen(false)
      fetchSweets()
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdate = async (data) => {
    try {
      setSubmitting(true)
      await updateSweet(selectedSweet._id, data, token)
      toast({ title: "Sweet updated successfully" })
      setIsEditOpen(false)
      setSelectedSweet(null)
      fetchSweets()
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this sweet?")) return
    await deleteSweet(id, token)
    toast({ title: "Sweet deleted" })
    fetchSweets()
  }

  const handleRestock = async () => {
    if (!restockQuantity) return
    await restockSweet(selectedSweet._id, Number(restockQuantity), token)
    toast({ title: "Stock updated" })
    setIsRestockOpen(false)
    setRestockQuantity("")
    fetchSweets()
  }

  if (loading) return <LoadingSpinner size="lg" text="Loading inventory..." />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your products</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add Sweet</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white text-black overflow-hidden">
            <DialogHeader>
              <DialogTitle>Create Sweet</DialogTitle>
              <DialogDescription>Add new product</DialogDescription>
            </DialogHeader>

            <div className="max-h-[75vh] overflow-y-auto pr-2">
              <SweetForm onSubmit={handleCreate} loading={submitting} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sweets.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell><Badge>{s.category}</Badge></TableCell>
                  <TableCell>{formatPrice(s.price)}</TableCell>
                  <TableCell>{s.quantity}</TableCell>
                  <TableCell className={getStockStatusColor(s.quantity)}>
                    {getStockStatus(s.quantity)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => {
                      setSelectedSweet(s)
                      setIsEditOpen(true)
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(s._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl bg-white text-black overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Sweet</DialogTitle>
            <DialogDescription>Update product</DialogDescription>
          </DialogHeader>

          <div className="max-h-[75vh] overflow-y-auto pr-2">
            {selectedSweet && (
              <SweetForm
                onSubmit={handleUpdate}
                initialData={selectedSweet}
                loading={submitting}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
