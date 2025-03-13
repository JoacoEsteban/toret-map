export type ToretMarker = {
  id: number
  latlng: { latitude: number; longitude: number }
  address: string
  is_removed: boolean
}

export type NotNull<T> = T extends null | undefined ? never : T
export type NotNullTuple<T extends any[]> = {
  [I in keyof T]: NotNull<T[I]>
}
export type NotNullRecord<T extends Record<string, any>> = {
  [K in keyof T]: NotNull<T[K]>
}
