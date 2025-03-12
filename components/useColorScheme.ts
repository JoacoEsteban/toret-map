import * as rn from 'react-native'

export function useColorScheme() {
  return rn.useColorScheme() ?? 'light'
}
