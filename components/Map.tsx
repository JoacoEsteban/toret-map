import { Turin } from '@/constants/location'
import { NightMapTheme } from '@/constants/map-themes'
import { Location, MapApi, locationToRegion } from '@/lib/api'
import React, { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useColorScheme } from '@/components/useColorScheme'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import { LocateUserButton } from './LocateUserButton'
import { Subject, filter, map, take, withLatestFrom } from 'rxjs'
import { NotNullTuple } from '@/lib/types'

class Controller {
  public centerInLocation$$ = new Subject<void>()
  public mapRef$$ = new Subject<MapView>()

  constructor(private readonly mapApi: MapApi) {
    this.centerInLocation$$
      .pipe(
        withLatestFrom(this.mapApi.UserLocation$, this.mapRef$$),
        filter(function (values): values is NotNullTuple<typeof values> {
          const [, location, mapRef] = values
          return Boolean(location && mapRef)
        }),
        map(([, location, mapRef]) => [location, mapRef] as const),
      )
      .subscribe(([location, mapRef]) => {
        mapRef?.animateToRegion(locationToRegion(location))
      })
  }

  public onMapReady(mapRef: MapView) {
    this.mapRef$$.next(mapRef)
    this.mapApi.UserLocation$.pipe(
      filter((item) => item !== null),
      take(1),
    ).subscribe(() => this.centerInLocation$$.next())
  }

  public async centerInLocation() {
    await this.mapApi.updateUserLocation()
    this.centerInLocation$$.next()
  }
}

const Map = ({ mapApiInstance }: { mapApiInstance: MapApi }) => {
  const theme = useColorScheme()
  const markers = mapApiInstance.useToretList()
  const mapStyle = theme === 'dark' ? NightMapTheme : []
  const mapRef = useRef<MapView>(null)
  const controller = useRef(new Controller(mapApiInstance))

  useEffect(
    () =>
      void (mapRef.current && controller.current.onMapReady(mapRef.current)),
    [mapRef],
  )

  return (
    <>
      <MapView
        ref={mapRef}
        showsMyLocationButton={false}
        provider={PROVIDER_DEFAULT}
        style={styles.container}
        customMapStyle={mapStyle}
        initialRegion={Turin}
        rotateEnabled={false}
        showsUserLocation={true}
        userInterfaceStyle={theme}>
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.address}
          />
        ))}
      </MapView>
      <LocateUserButton
        onPress={async () => {
          await controller.current.centerInLocation()
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})

export default Map
