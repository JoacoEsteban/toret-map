/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
} from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '../lib/color-scheme'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

type ThemeProps = {
  color?: {
    light: string
    dark: string
  }
}
export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type TextInputProps = ThemeProps &
  DefaultTextInput['props'] & {
    bottomSheet?: boolean
  }

export function useThemedProp(props: { light: string; dark: string }) {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  return colorFromProps
}

export function useThemeColor(colorName: ColorName) {
  const theme = useColorScheme()
  return Colors[theme][colorName]
}

export function useTheme() {
  const theme = useColorScheme()
  return Colors[theme]
}

export function useFallbackedThemeProp(
  props: { light: string; dark: string },
  fallback: undefined,
): string
export function useFallbackedThemeProp(
  props: { light: string; dark: string } | undefined,
  fallback: ColorName,
): string
export function useFallbackedThemeProp(
  props: undefined,
  fallback: undefined,
): void
export function useFallbackedThemeProp(
  props: { light: string; dark: string } | undefined,
  fallback: ColorName | undefined,
): string {
  if (!props && !fallback) {
    throw new Error('Either props or fallback must be provided')
  }
  return props ? useThemedProp(props) : useThemeColor(fallback!)
}

export function Text(props: TextProps) {
  const { style, color, ...otherProps } = props

  return (
    <DefaultText
      style={[{ color: useFallbackedThemeProp(color, 'text') }, style]}
      {...otherProps}
    />
  )
}

export function View(props: ViewProps) {
  const { style, color, ...otherProps } = props
  const backgroundColor = useFallbackedThemeProp(color, 'background')

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TextInput(props: TextInputProps) {
  const { style, color, bottomSheet, ...otherProps } = props
  const Render = bottomSheet ? BottomSheetTextInput : DefaultTextInput

  return (
    <Render
      style={[{ color: useFallbackedThemeProp(color, 'text') }, style]}
      {...otherProps}
    />
  )
}
