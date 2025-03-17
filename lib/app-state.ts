import { bind } from '@react-rxjs/core'
import { AppState, AppStateStatus } from 'react-native'
import { Observable, fromEvent, startWith } from 'rxjs'

export const [useAppState, AppState$] = bind(
  new Observable<AppStateStatus>((subscriber) => {
    const subscription = AppState.addEventListener('change', (state) => {
      subscriber.next(state)
    })

    return () => subscription.remove()
  }).pipe(startWith(AppState.currentState)),
)
