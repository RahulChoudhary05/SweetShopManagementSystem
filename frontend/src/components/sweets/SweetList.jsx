"use client"

import { SweetCard } from "./SweetCard"
import { Skeleton } from "../ui/skeleton"

export const SweetList = ({ sweets, loading, onPurchase }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        ))}
      </div>
    )
  }

  if (!sweets || sweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any sweets matching your criteria. Try adjusting your filters or check back later!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet) => (
        <SweetCard key={sweet._id} sweet={sweet} onPurchase={onPurchase} />
      ))}
    </div>
  )
}
