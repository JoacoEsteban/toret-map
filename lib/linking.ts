import { Alert, Linking } from 'react-native'

type OpenMapFunction = (args: {
  latitude: number
  longitude: number
}) => Promise<void>

export const openAppleMaps: OpenMapFunction = async ({
  latitude,
  longitude,
}) => {
  try {
    const url = `http://maps.apple.com/?saddr=Current%20Location&daddr=${latitude},${longitude}`

    const supported = await Linking.canOpenURL(url)

    if (!supported) {
      Alert.alert('Cannot open Apple Maps.')
      return
    }

    await Linking.openURL(url)
  } catch (error) {
    Alert.alert('There was an error opening Apple Maps: ' + error)
  }
}
