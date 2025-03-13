import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from './Themed'
import { useContext } from 'react'
import { GlobalContext } from '@/app/global-context'
import { delayWhen, distinctUntilChanged, interval, of } from 'rxjs'
import { contextBinder } from '@react-rxjs/utils'

const contextBind = contextBinder(() => useContext(GlobalContext))

const [useUpdatingUserLocation] = contextBind((context) => {
  const { mapApiInstance } = context ?? {}
  return (
    mapApiInstance?.UpdatingUserLocation$.pipe(
      distinctUntilChanged(),
      delayWhen((val) => interval(!val ? 300 : 0)),
    ) ?? of(false)
  )
})

export const LocateUserButton = ({ onPress }: { onPress: () => void }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: useThemeColor('background'),
      bottom: 20,
      right: 20,
      padding: 15,
      borderRadius: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
  })

  const size = 28
  const color = useThemeColor('text')

  const isUpdatingUserLocation = useUpdatingUserLocation()

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {isUpdatingUserLocation ? (
        <ActivityIndicator size={size} color={color} />
      ) : (
        <MaterialIcons size={size} color={color} name="my-location" />
      )}
    </Pressable>
  )
}
