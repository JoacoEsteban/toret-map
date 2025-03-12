import { BehaviorSubject } from 'rxjs'
import { Marker } from './types'
import { StaticToretList } from '@/constants/toret-list'
import { bind, shareLatest } from '@react-rxjs/core'
import * as ExpoLocation from 'expo-location'

export type Location = ExpoLocation.LocationObject & {
  latitude: number
  longitude: number
  address: string
}

export function locationToRegion(
  location: Pick<Location, 'latitude' | 'longitude'>,
) {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  }
}

export async function locationWithAdress(
  location: ExpoLocation.LocationObject,
): Promise<Location> {
  const address = await ExpoLocation.reverseGeocodeAsync({
    latitude: location.coords?.latitude!,
    longitude: location.coords?.longitude!,
  })

  return {
    ...location,
    latitude: location.coords?.latitude,
    longitude: location.coords?.longitude,
    address: `${address[0].name}, ${address[0].region}`,
  }
}

export class MapApi {
  private ToretList = new BehaviorSubject<Marker[]>(
    StaticToretList.filter((marker) => !marker.is_removed),
  )
  public ToretList$ = this.ToretList.asObservable().pipe(shareLatest())
  public useToretList = bind(this.ToretList$, [])[0]

  private HasLocationAccess = new BehaviorSubject(false)
  public HasLocationAccess$ = this.HasLocationAccess.asObservable()

  private UserLocation = new BehaviorSubject<Location | null>(null)
  public UserLocation$ = this.UserLocation.asObservable()
  public useUserLocation = bind(this.UserLocation$)[0]

  async requestLocation() {
    // let { status } = await ExpoLocation.requestBackgroundPermissionsAsync();
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      this.HasLocationAccess.next(false)
      return
    }

    this.HasLocationAccess.next(true)
    await this.updateUserLocation()
  }

  async updateUserLocation() {
    let location = await ExpoLocation.getCurrentPositionAsync({})
    this.UserLocation.next(await locationWithAdress(location))
  }
}
