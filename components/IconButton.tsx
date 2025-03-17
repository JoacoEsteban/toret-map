import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { ColorName, useThemeColor } from './Themed'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '@/app/global-context'
import { delayWhen, distinctUntilChanged, interval, of } from 'rxjs'
import { contextBinder } from '@react-rxjs/utils'
import { Style, useOnce } from '@/lib/react'

export const IconButton = ({
  onPress,
  icon,
  loading = false,
  style = {},
  backgroundColorName = 'background',
}: {
  onPress: () => void
  icon: React.ComponentProps<typeof MaterialIcons>['name']
  loading?: boolean
  style?: Style
  backgroundColorName?: ColorName
}) => {
  const backgroundColor = useThemeColor(backgroundColorName)
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 40,
          height: 40,
          backgroundColor,
          // backgroundColor: '#f0f',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '100%',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        },
      }),
    [backgroundColor],
  )

  const size = 28
  const color = useThemeColor('text')

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={size} color={color} />
      ) : (
        <MaterialIcons size={size} color={color} name={icon} />
      )}
    </Pressable>
  )
}
