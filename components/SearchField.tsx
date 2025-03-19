import { View } from 'react-native'
import {
  TextInput,
  TextInputProps,
  useFallbackedThemeProp,
  useTheme,
} from './Themed'
import { IconButton } from './IconButton'
import { If, Then } from 'react-if'

export function SearchField({
  style,
  ...props
}: TextInputProps & {
  change: (text: string) => void
}) {
  const { text200, borderColor, background200: backgroundColor } = useTheme()

  return (
    <View>
      <TextInput
        onChangeText={(e) => {
          props.change(e)
        }}
        placeholderTextColor={text200}
        style={[
          {
            backgroundColor,
            borderColor,
            borderWidth: 1,
            padding: 12,
            borderRadius: 8,
          },
          style,
        ]}
        {...props}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
        }}>
        <If condition={Boolean(props.value?.length)}>
          <Then>
            <IconButton
              backgroundColorName="background300"
              colorName="background"
              size={24}
              onPress={() => props.change('')}
              icon="close"
            />
          </Then>
        </If>
      </View>
    </View>
  )
}
