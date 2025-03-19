import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { ColorName, useTheme, useThemeColor, useThemedProp } from './Themed'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '@/app/global-context'
import { delayWhen, distinctUntilChanged, interval, of } from 'rxjs'
import { contextBinder } from '@react-rxjs/utils'
import { Style, useOnce } from '@/lib/react'

export const IconButton = ({
  onPress,
  icon,
  loading = false,
  style,
  backgroundColorName = 'background',
  colorName = 'text',
  size = 40,
  iconSize,
}: {
  onPress: () => void
  icon: React.ComponentProps<typeof MaterialIcons>['name']
  loading?: boolean
  style?: Style
  backgroundColorName?: ColorName
  colorName?: ColorName
  size?: number
  iconSize?: number
}) => {
  const backgroundColor = useThemeColor(backgroundColorName)
  const color = useThemeColor(colorName)
  const { shadow } = useTheme()
  const safeIconSize = useMemo(
    () => Math.min(size, iconSize ?? size * 0.7),
    [size, iconSize],
  )

  const styles = useMemo(
    () =>
      ({
        width: size,
        height: size,
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        boxShadow: shadow,
      }) as const,
    [backgroundColor, size, shadow],
  )

  return (
    <Pressable style={[styles, style]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={safeIconSize} color={color} />
      ) : (
        <MaterialIcons size={safeIconSize} color={color} name={icon} />
      )}
    </Pressable>
  )
}
