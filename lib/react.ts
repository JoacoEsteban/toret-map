import { useEffect, useState } from 'react'
import { ImageStyle, StyleProp, ViewStyle } from 'react-native'

export type Style = StyleProp<ViewStyle>
export type Constructor<T, K extends any[]> = new (...args: K) => T

export function onMounted(fn: () => void) {
  useEffect(fn, [])
}

export function useInstance<T, K extends any[]>(
  ctor: Constructor<T, K>,
  ...args: K
) {
  return useOnce(() => new ctor(...args))
}

export function useOnce<T>(fn: () => T) {
  const [value] = useState(fn)
  return value
}
