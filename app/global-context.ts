import { MapApi } from '@/lib/api'
import { createContext } from 'react'

export const GlobalContext = createContext<{
  mapApiInstance: MapApi
} | null>(null)
