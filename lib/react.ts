import { useEffect, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Observable, Subscription } from 'rxjs'
import { bind } from '@react-rxjs/core'

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

export function useSubscriptions(fn: () => Subscription[]) {
  onMounted(() => {
    const subs = fn()
    return () => subs.forEach((sub) => sub?.unsubscribe())
  })
}

export function bindHook<T>(obs: Observable<T>) {
  return bind(obs)[0]
}
