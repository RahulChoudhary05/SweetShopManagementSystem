"use client"

import { useState, useEffect } from "react"
import { getSweets, searchSweets } from "../services/api"

export const useSweets = () => {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const data = await getSweets()
      setSweets(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const search = async (query) => {
    try {
      setLoading(true)
      const data = await searchSweets(query)
      setSweets(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  return {
    sweets,
    loading,
    error,
    refetch: fetchSweets,
    search,
  }
}
