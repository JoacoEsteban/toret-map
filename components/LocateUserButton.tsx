import { useThemeColor } from './Themed'
import { useContext } from 'react'
import { GlobalContext } from '@/app/global-context'
import { delayWhen, distinctUntilChanged, interval, of } from 'rxjs'
import { contextBinder } from '@react-rxjs/utils'
import { IconButton } from './IconButton'

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
  const styles = {
    position: 'absolute',
    backgroundColor: useThemeColor('background'),
    bottom: 200,
    right: 20,
  } as const

  const isUpdatingUserLocation = useUpdatingUserLocation()

  return (
    <IconButton
      style={styles}
      size={52}
      iconSize={28}
      icon="my-location"
      loading={isUpdatingUserLocation}
      onPress={onPress}
    />
  )
}
