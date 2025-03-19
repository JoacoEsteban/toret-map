import { ToretMarker } from '@/lib/types'
import { PropsWithChildren } from 'react'
import { H2 } from './StyledText'
import { Text, View } from './Themed'
import { IconButton } from './IconButton'
import { Button } from './Button'
import { openAppleMaps } from '@/lib/linking'
import { BottomSheetView } from '@gorhom/bottom-sheet'

export default function ToretView(
  props: PropsWithChildren<{
    onClose: () => void
    toret: ToretMarker
  }>,
) {
  const { toret } = props
  return (
    <BottomSheetView
      style={{
        padding: 20,
        height: '100%',
        flex: 1,
        gap: 10,
      }}>
      <H2
        Container={({ children, style }) => (
          <View
            style={[
              style,
              {
                display: 'flex',
                flexDirection: 'row',
              },
            ]}>
            <View style={{ flex: 1 }}>{children}</View>
            <IconButton
              size={32}
              backgroundColorName="background200"
              icon="close"
              onPress={props.onClose}></IconButton>
          </View>
        )}>
        <Text>{toret.address}</Text>
      </H2>
      <Button
        onPress={() => {
          openAppleMaps(toret.latlng)
        }}>
        Get Directions
      </Button>
    </BottomSheetView>
  )
}
