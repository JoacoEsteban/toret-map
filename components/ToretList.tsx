import { MapApi } from '@/lib/api'
import { bind } from '@react-rxjs/core'
import React, { useRef } from 'react'
import { FlatList, StyleSheet, Pressable } from 'react-native'
import { map } from 'rxjs'
import { Text, useThemeColor, useThemedProp } from './Themed'
import { router } from 'expo-router'

const Item = ({
  item,
  onPress,
}: {
  item: { id: string | number; title: string }
  onPress: () => void
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    item: {
      backgroundColor: useThemeColor('background-200'),
      borderColor: useThemedProp({
        light: '#ccc',
        dark: '#444',
      }),
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 14,
      borderRadius: 6,
      marginVertical: 6,
    },
    title: {},
  })

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed ? { opacity: 0.5 } : null]}>
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  )
}

export const ToretList = ({ mapApiInstance }: { mapApiInstance: MapApi }) => {
  const handleItemPress = (item: { id: number; title: string }) => {
    router.push(`/`)
    mapApiInstance.selectToret(item.id)
  }

  const useItems = useRef(
    bind(
      mapApiInstance.ToretList$.pipe(
        map((items) =>
          items.map((item) => ({ id: item.id, title: item.address })),
        ),
      ),
      [],
    )[0],
  )

  const items = useItems.current()

  return (
    <FlatList
      style={{
        paddingVertical: 20,
      }}
      data={items}
      renderItem={({ item }) => (
        <Item item={item} onPress={() => handleItemPress(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
