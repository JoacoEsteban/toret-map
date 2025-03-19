import React, { useMemo } from 'react'
import { FlatList, StyleSheet, Pressable, View } from 'react-native'
import { Text, useTheme, useThemeColor, useThemedProp } from './Themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { H3 } from './StyledText'

const Item = ({
  item,
  onPress,
  first,
  last,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
}: {
  item: { id: string | number; title: string }
  onPress: () => void
  first?: boolean
  last?: boolean
  borderRadius: number
  paddingVertical: number
  paddingHorizontal: number
}) => {
  const theme = useTheme()
  const { borderColor } = theme

  const styles = useMemo(() => {
    const radius = [
      first && {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderTopWidth: 1,
        marginTop: 0,
      },
      last && {
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderBottomWidth: 1,
        marginBottom: 0,
      },
    ]
      .filter(Boolean)
      .reduce((acc, curr) => ({ ...acc, ...curr }), {})

    return StyleSheet.create({
      container: {
        flex: 1,
      },
      item: {
        borderColor,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingHorizontal,
        paddingVertical,
        marginVertical: -1,
        ...radius,
      },
      title: {},
    })
  }, [theme, first, last])

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed ? { backgroundColor: borderColor } : null,
      ]}>
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  )
}

export const ToretList = ({
  scrollEnabled = true,
  onItemPress,
  items,
}: {
  scrollEnabled?: boolean
  onItemPress: (item: { id: number; title: string }) => void
  items: Array<{
    id: number
    title: string
  }>
}) => {
  const separatorColor = useThemedProp({
    light: '#ccc',
    dark: '#444',
  })

  const bg = useThemeColor('background200')
  const backgroundColor = useMemo(
    () => (items.length === 0 ? 'transparent' : bg),
    [items.length, bg],
  )
  const safeAreaInsets = useSafeAreaInsets()
  const borderRadius = 8
  const padding = 16

  return (
    <FlatList
      scrollEnabled={scrollEnabled}
      style={{
        marginBottom: safeAreaInsets.bottom,
        backgroundColor,
        borderRadius,
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            width: '100%',
            paddingHorizontal: padding,
            alignSelf: 'center',
          }}>
          <View style={{ backgroundColor: separatorColor, height: 1 }} />
        </View>
      )}
      data={items}
      renderItem={({ item, index }) => (
        <Item
          paddingVertical={padding}
          paddingHorizontal={padding}
          item={item}
          onPress={() => onItemPress(item)}
          first={index === 0}
          last={index === items.length - 1}
          borderRadius={borderRadius}
        />
      )}
      ListEmptyComponent={<H3>No items found</H3>}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
