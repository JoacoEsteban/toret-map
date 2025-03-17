import { AppState$ } from '@/lib/app-state'
import { bind } from '@react-rxjs/core'
import { Appearance } from 'react-native'
import { Observable, combineLatestWith, filter, map, startWith } from 'rxjs'

export const [useColorScheme, ColorScheme$] = bind(
  new Observable<'dark' | 'light'>((subscriber) => {
    const subscription = Appearance.addChangeListener((event) => {
      subscriber.next(event.colorScheme ?? 'light')
    })

    return () => subscription.remove()
  }).pipe(
    startWith(Appearance.getColorScheme() ?? 'light'),
    combineLatestWith(AppState$),
    filter(([theme, state]) => state !== 'background'),
    map(([theme]) => theme),
  ),
)
