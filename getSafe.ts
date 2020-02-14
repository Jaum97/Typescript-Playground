type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : []

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

type Maybe<T> = T | undefined

type getSafe< O, P extends string[]> = (obj: O, props: P) => P extends [keyof O] 
  ? HasTail< P > extends true 
    ? getSafe< O[Head<P>], Tail< P > > 
    : O[Head< P >]
  : undefined

declare function getSafe< O, P extends string[]>(obj: O, props: P): getSafe<O, P>

// function getSafe<O = Object, P extends any[] = []>(obj: O, props: P): getSafe<O, P> {
//   const val = obj[props[0]]

//   if(val === undefined || props.length === 1) return val

//   return getSafe(val, props.slice(1))
// }

const obj00 = {
  nested01: {
    nested02: {
      nested03: {
        nested04: 'test'
      }
    }
  },
  nested05: {}
}

const t1 = getSafe(obj00, ['nested01'])

t1
