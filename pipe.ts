// Work in progress :/

type GenericFn = (...args: any[]) => any


export declare function pipe<F extends GenericFn[], R>(
	functions: Array<(...args: F) => R>
): Pipe<F, R>

// the return type of Head<F> will be passed to
// Head<Tail<F>> until all fns have been consumed
// the R
type GenericTuple = [any, ...any[]]

type Head<T extends any[]> = T extends GenericTuple ? T[0] : never

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : []

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

type Pipe<F extends GenericFn[]> = <T>(f: Head<F>) => HasTail<F> extends true 
	? Pipe<Head<Tail<F>>>
	: ReturnType<Head<F>>

type Pipe3<F extends GenericFn[]> = {
	0: Pipe3<Head<Tail<F>>>
	1: never
	2: ReturnType<Head<F>>
}[
	HasTail<F> extends true
	? ReturnType<Head<F>> extends Parameters<Head<Tail<F>>>
		? 0
		: 2
	: 2
]

type Pipe2<F extends GenericFn[]> = {
	0: Pipe2<Tail<F>>
	1: Head<F>
}[
	HasTail<F> extends true 
	? 0
	: 1
]

type Pipe4<F extends GenericFn[]> = {
	0: Pipe4<Tail<F>>
	1: Head<F>
	2: never
} [
	HasTail<F> extends true
	?	[ReturnType<Head<F>>] extends Parameters<Head<Tail<F>>>
		? 0
		: 2
	: 1
]

type test06 = Pipe4<[typeof sum, typeof toString, typeof toArray]>

type test10 = HasTail< [(a: number) => string, (a: number) => number[]]>

type test11 = [ReturnType<Head<[(a: number) => string, (a: number) => number[]]>>] extends Parameters<Head<Tail<[(a: number) => string, (a: number) => number[]]>>> ? true : false

type test07 = [ReturnType<Head<[typeof sum, typeof toArray]>>]
type test08 = Parameters<Head<Tail<[typeof sum, typeof toArray]>>>
type test09 = test07 extends test08 ? true : false

const sum = (a: number,b: number = 0): number => a + b

const toString = (a: number): number => Number(a)

const toArray = (a: number): Array<number> => [a]

type test02<F extends GenericFn[]> = [ReturnType<Head<F>>] extends Parameters<Head<Tail<F>>> ? true : false

type test04 = ReturnType<Head<[typeof sum, typeof toString, typeof toArray]>>

type test05 = Parameters<Head<Tail<[typeof sum, typeof toString, typeof toArray]>>>

type test03 = test02<[typeof sum, typeof toArray]>


type test01 = Pipe3<[typeof sum, typeof toString, typeof toArray]>

export declare function pipe(...functions) {
	return value => {
		return functions.reduce((currentValue, currentFunction) => {
			return currentFunction(currentValue)
		}, value)
	}
}
