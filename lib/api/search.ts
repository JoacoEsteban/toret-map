import { BehaviorSubject, Observable, combineLatestWith, map } from 'rxjs'
import { shareLatest } from '@react-rxjs/core'
import TrieSearch from 'trie-search'
import { bindHook } from '../react'
import { ToretMarker } from '../types'

type ToretItem = {
  id: number
  title: string
}

export class ToretListSearchApi {
  private Search$ = new BehaviorSubject('')
  public readonly useItems: () => ToretItem[]
  public readonly useQuery = bindHook(this.Search$)

  constructor(private readonly ToretList$: Observable<ToretMarker[]>) {
    const trie$ = this.ToretList$.pipe(
      map(
        (items) =>
          new TrieSearchImpl<ToretMarker>(
            items,
            'address' satisfies keyof ToretMarker,
            {
              ignoreCase: true,
              idFieldOrFunction: 'id' satisfies keyof ToretMarker,
            },
          ),
      ),
    )

    const filteredList$ = trie$.pipe(
      combineLatestWith(this.Search$),
      map(([items, query]) => {
        const filteredItems = items.search(query)
        const mapped = filteredItems.map((item) => ({
          id: item.id,
          title: item.address,
        }))
        return mapped
      }),
      shareLatest(),
    )

    this.useItems = bindHook<ToretItem[]>(filteredList$)
  }

  search(query: string) {
    this.Search$.next(query)
  }
}

class TrieSearchImpl<T> extends TrieSearch<T> {
  constructor(
    private readonly allItems: T[],
    ...args: ConstructorParameters<typeof TrieSearch<T>>
  ) {
    super(...args)
    this.addAll(this.allItems)
  }

  override search(...args: Parameters<TrieSearch<T>['search']>): T[] {
    const [phrases] = args
    if (phrases.length === 0) {
      return this.all()
    }
    return super.search(...args)
  }

  all() {
    return this.allItems
  }
}
