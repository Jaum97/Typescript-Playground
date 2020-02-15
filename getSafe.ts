type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : []

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

type Last<T extends any[]> = {
	0: Last<Tail<T>>
	1: Head<T>
}[
	HasTail<T> extends true
	? 0
	: 1
]

type Length<T extends any[]> = T['length']

type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T

type Drop<N extends number, T extends any[], I extends any[] = []> = {
	0: Drop<N, Tail<T>, Prepend<any, I>>
	1: T
}[
	Length<I> extends N
	? 1
	: 0
]

type Cast<X, Y> = X extends Y ? X : Y

type Pos<I extends any[]> = Length<I>

type Next<I extends any[]> = Prepend<any, I>

type Prev<I extends any[]> = Tail<I>

type Iter<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
	0: Iter<Index, Next<From>, Next<I>>
	1: From
}[
	Pos<I> extends Index
	? 1
	: 0
]

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
	0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
	1: R
}[
	Pos<I> extends Length<T>
	? 1
	: 0
]

// type Concat<T1 extends any[], T2 extends any[]> = Reverse<Cast<Reverse<T1>, any[]>, T2>

type getSafe<O, P extends any[]> = 
<T>(obj: O, props: P) => 
	Length<P> extends 1 
		? Head<P> extends keyof O 
			? O[Head<P>]
		 	: never
		: getSafe<O[Head<P>], Tail<P>>
		

const getSafe = function<O,P extends any[]>(obj: O, props: P): ReturnType<getSafe<O, P>> {
	const val = obj[props[0]]

	if (val === undefined || props.length === 1) return val

	return getSafe(val, props.slice(1))
}

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

type t1 = Head<['nested01']> extends keyof typeof obj00 ? true : false
type t2 = Length<['neste01']> extends 1 ? true : false

const t1 = getSafe(obj00, ['nested01'])

t1

