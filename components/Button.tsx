import { Style, useOnce } from '@/lib/react'
import React, { PropsWithChildren, useRef } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

export function Button({
  onPress,
  children,
  containerStyle,
}: PropsWithChildren<{
  onPress?: () => void
  containerStyle?: Style
}>) {
  const styles = useOnce(() =>
    StyleSheet.create({
      button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        textAlign: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
    }),
  )

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}
