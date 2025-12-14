const API_URL = import.meta.env.VITE_API_URL || "https://sweetshopmanagementsystem-lsgt.onrender.com/api"

// Helper function to get headers
const getHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}

// Auth API
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Registration failed")
  }

  return data
}

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Login failed")
  }

  return data
}

// Sweets API
export const getSweets = async () => {
  const response = await fetch(`${API_URL}/sweets`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch sweets")
  }

  return data.data
}

export const getSweet = async (id) => {
  const response = await fetch(`${API_URL}/sweets/${id}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch sweet")
  }

  return data.data
}

export const searchSweets = async (query) => {
  const params = new URLSearchParams(query)
  const response = await fetch(`${API_URL}/sweets/search?${params}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Search failed")
  }

  return data.data
}

export const createSweet = async (sweetData, token) => {
  const response = await fetch(`${API_URL}/sweets`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(sweetData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to create sweet")
  }

  return data.data
}

export const updateSweet = async (id, sweetData, token) => {
  const response = await fetch(`${API_URL}/sweets/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(sweetData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to update sweet")
  }

  return data.data
}

export const deleteSweet = async (id, token) => {
  const response = await fetch(`${API_URL}/sweets/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete sweet")
  }

  return data
}

export const purchaseSweet = async (id, quantity, token) => {
  const response = await fetch(`${API_URL}/sweets/${id}/purchase`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ quantity }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Purchase failed")
  }

  return data
}

export const restockSweet = async (id, quantity, token) => {
  const response = await fetch(`${API_URL}/sweets/${id}/restock`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ quantity }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Restock failed")
  }

  return data
}
