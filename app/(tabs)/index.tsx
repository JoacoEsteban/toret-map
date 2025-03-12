import { StyleSheet } from 'react-native'

import { View } from '@/components/Themed'
import Map from '@/components/Map'
import { Subscribe } from '@react-rxjs/core'
import { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../global-context'

export default function MapScreen() {
  const { mapApiInstance } = useContext(GlobalContext) ?? {}
  return (
    mapApiInstance && (
      <>
        <View>
          <Subscribe>
            <Map mapApiInstance={mapApiInstance} />
          </Subscribe>
        </View>
      </>
    )
  )
}

const styles = StyleSheet.create({})
