import React, { useEffect, useRef } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Tabs } from 'expo-router'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/lib/color-scheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { MapApi } from '@/lib/api'
import { GlobalContext } from '../global-context'
import { onMounted, useInstance } from '@/lib/react'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const mapApi = useInstance(MapApi)

  onMounted(() => void mapApi.requestLocation())

  return (
    <GlobalContext.Provider value={{ mapApiInstance: mapApi }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, false),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Map',
            tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: 'List',
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="information" color={color} />
            ),
          }}
        />
      </Tabs>
    </GlobalContext.Provider>
  )
}
