import { Turin } from '@/constants/location'
import { NightMapTheme } from '@/constants/map-themes'
import { Location, MapApi, locationToRegion } from '@/lib/api'
import React, { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { useColorScheme } from '@/components/useColorScheme'
import MapView, { MapMarker, Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import { LocateUserButton } from './LocateUserButton'
import { Subject, filter, map, take, withLatestFrom } from 'rxjs'
import { NotNullTuple, ToretMarker } from '@/lib/types'

class Controller {
  private centerInLocation$$ = new Subject<void>()
  private mapRef$$ = new Subject<MapView>()
  private markerRefs$$ = new Subject<Map<ToretMarker['id'], MapMarker | null>>()

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

    this.mapApi.SelectedToret$.pipe(
      withLatestFrom(this.markerRefs$$),
      filter(function (values): values is NotNullTuple<typeof values> {
        const [toret, markers] = values
        return Boolean(toret && markers)
      }),
    ).subscribe(([toret, markers]) => {
      const marker = markers.get(toret.id)
      if (marker) {
        marker.showCallout()
      }
    })
  }

  public onMapReady(
    mapRef: MapView,
    markerRefs: Map<ToretMarker['id'], MapMarker | null>,
  ) {
    this.mapRef$$.next(mapRef)
    this.markerRefs$$.next(markerRefs)

    this.mapApi.UserLocation$.pipe(
      filter((item) => item !== null),
      take(1),
    ).subscribe(() => this.centerInLocation$$.next())
  }

  public async centerInLocation() {
    await this.mapApi.updateUserLocation()
    this.centerInLocation$$.next()
  }

  public onMarkerSelect(id: ToretMarker['id'] | null) {
    this.mapApi.selectToret(id)
  }
}

const ToretMap = ({ mapApiInstance }: { mapApiInstance: MapApi }) => {
  const theme = useColorScheme()
  const markers = mapApiInstance.useToretList()
  const mapStyle = theme === 'dark' ? NightMapTheme : []
  const mapRef = useRef<MapView>(null)
  const markerRefs = useRef(new Map<ToretMarker['id'], MapMarker | null>())
  const controller = useRef(new Controller(mapApiInstance))

  useEffect(
    () =>
      void (
        mapRef.current &&
        controller.current.onMapReady(mapRef.current, markerRefs.current)
      ),
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
        userInterfaceStyle={theme}
        onMarkerDeselect={() => controller.current.onMarkerSelect(null)}>
        {markers.map((marker, index) => (
          <Marker
            ref={(ref) => markerRefs.current.set(marker.id, ref)}
            onSelect={() => controller.current.onMarkerSelect(marker.id)}
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

export default ToretMap
