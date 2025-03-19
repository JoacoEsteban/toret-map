import { View, useThemeColor } from '@/components/Themed'
import ToretMap from '@/components/Map'
import { useContext, useRef } from 'react'
import { GlobalContext } from '../global-context'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { onMounted, useInstance, useSubscriptions } from '@/lib/react'
import { Else, If, Then } from 'react-if'
import { ToretListSearchApi } from '@/lib/api/search'
import ToretView from '@/components/ToretView'
import ToretListView from '@/components/ToretListView'

export default function MapScreen() {
  const { mapApiInstance } = useContext(GlobalContext) ?? {}
  if (!mapApiInstance) return null

  const selectedToret = mapApiInstance.useSelectedToret()
  const bgStyle = { backgroundColor: useThemeColor('background') }
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  useSubscriptions(() => [
    mapApiInstance.SelectedToret$.subscribe((selectedToret) => {
      if (bottomSheetRef.current) {
        if (selectedToret) {
          bottomSheetRef.current.present()
        }
      }
    }),
  ])
  onMounted(() => bottomSheetRef.current?.present())
  const searchController = useInstance(
    ToretListSearchApi,
    mapApiInstance.ToretList$,
  )

  return (
    <View>
      <ToretMap mapApiInstance={mapApiInstance} />
      <BottomSheetModal
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        backgroundStyle={bgStyle}
        snapPoints={['20%', '80%']}
        handleIndicatorStyle={{
          backgroundColor: useThemeColor('text'),
        }}>
        <If condition={Boolean(selectedToret)}>
          <Then>
            {() => (
              <ToretView
                onClose={() => mapApiInstance.selectToret(null)}
                toret={selectedToret!}
              />
            )}
          </Then>
          <Else>
            <ToretListView
              controller={searchController}
              onItemPress={(item: { id: number; title: string }) => {
                bottomSheetRef.current?.collapse()
                mapApiInstance.selectToret(item.id)
              }}
              onSearchFocus={() => bottomSheetRef.current?.snapToIndex(1)}
            />
          </Else>
        </If>
      </BottomSheetModal>
    </View>
  )
}
