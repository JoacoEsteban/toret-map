import { StyleSheet } from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import ToretMap from '@/components/Map'
import { Subscribe } from '@react-rxjs/core'
import { useContext, useRef } from 'react'
import { GlobalContext } from '../global-context'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { onMounted } from '@/lib/react'

export default function MapScreen() {
  const { mapApiInstance } = useContext(GlobalContext) ?? {}
  const bgStyle = { backgroundColor: useThemeColor('background') }
  const selectedToret = mapApiInstance?.useSelectedToret()
  const bottomSheetRef = useRef<BottomSheet>(null)

  onMounted(() => {
    mapApiInstance?.SelectedToret$.subscribe((selectedToret) => {
      if (bottomSheetRef.current) {
        if (selectedToret) bottomSheetRef.current?.snapToIndex(2)
        else bottomSheetRef.current?.close()
      }
    })
  })

  return (
    mapApiInstance && (
      <>
        <View>
          <Subscribe>
            <ToretMap mapApiInstance={mapApiInstance} />
            <BottomSheet
              index={-1}
              ref={bottomSheetRef}
              snapPoints={['50%', '80%']}
              backgroundStyle={bgStyle}
              handleIndicatorStyle={{
                backgroundColor: useThemeColor('text'),
              }}>
              <BottomSheetView style={bgStyle}>
                <Text>{selectedToret?.address}</Text>
              </BottomSheetView>
            </BottomSheet>
          </Subscribe>
        </View>
      </>
    )
  )
}

const styles = StyleSheet.create({})
