import { PropsWithChildren } from 'react'
import { ToretListSearchApi } from '@/lib/api/search'
import { View, useTheme } from './Themed'
import { ToretList } from './ToretList'
import { H2 } from './StyledText'
import { SearchField } from './SearchField'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

export default function ToretListView(
  props: PropsWithChildren<{
    controller: ToretListSearchApi
    onItemPress: (item: { id: number; title: string }) => void
    onSearchFocus?: () => void
  }>,
) {
  const { controller } = props
  const { useItems, useQuery } = controller
  const items = useItems()
  const search = useQuery()
  const { shadow } = useTheme()
  const radius = 8

  return (
    <BottomSheetScrollView
      stickyHeaderIndices={[1]}
      contentContainerStyle={{
        padding: 20,
        display: 'flex',
        gap: 12,
      }}>
      <H2 containerStyle={{ marginBottom: 0 }}>
        Select a Toret to get directions
      </H2>
      <View
        style={{
          borderRadius: 0,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
          overflow: 'hidden',
          boxShadow: shadow,
        }}>
        <SearchField
          onFocus={props.onSearchFocus}
          bottomSheet
          change={(e) => {
            controller.search(e)
          }}
          value={search}
          placeholder="Search"
          aria-label="Search"
          style={{
            borderRadius: radius,
          }}
        />
      </View>
      <ToretList
        onItemPress={props.onItemPress}
        items={items}
        scrollEnabled={false}
      />
    </BottomSheetScrollView>
  )
}
