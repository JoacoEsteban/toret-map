import { StyleSheet } from 'react-native'

import { View } from '@/components/Themed'
import { ToretList } from '@/components/ToretList'
import { useContext } from 'react'
import { GlobalContext } from '../global-context'

export default function ToretListScreen() {
  const { mapApiInstance } = useContext(GlobalContext) ?? {}

  return (
    mapApiInstance && (
      <View style={styles.container}>
        <ToretList mapApiInstance={mapApiInstance} />
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
})
