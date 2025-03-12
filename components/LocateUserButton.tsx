import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from './Themed'

export const LocateUserButton = ({ onPress }: { onPress: () => void }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: useThemeColor({}, 'background'),
      bottom: 20,
      right: 20,
      padding: 15,
      borderRadius: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
  })

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialIcons
        size={28}
        color={useThemeColor({}, 'text')}
        name="my-location"
      />
    </Pressable>
  )
}
