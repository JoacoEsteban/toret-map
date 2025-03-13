import { useEffect } from 'react'

export function onMounted(fn: () => void) {
  useEffect(fn, [])
}
