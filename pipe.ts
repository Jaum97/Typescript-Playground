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

type Last<T extends any[]> = {
	0: Last<Tail<T>>
	1: Head<T>
}[
	HasTail<T> extends true
	? 0
	: 1
]

type PipeType<F extends GenericFn[]> = {
	0: PipeType<Tail<F>>
	1: F
	2: "The return type of one of the functions is not a valid argument for the next one"
} [
	HasTail<F> extends true
	?	[ReturnType<Head<F>>] extends Parameters<Head<Tail<F>>>
		? 0
		: 2
	: 1
]

const sum = (a: string): string => String(a)

const toString = (a: number): number => Number(a)

const toArray = (a: number): Array<number> => [a]

type test01 = PipeType<[typeof sum, typeof toString, typeof toArray]>

export declare function pipe<
F extends PipeType<U>, U extends GenericFn[]>(...functions: F): 
(...value: Parameters<Head<F>>) => ReturnType<Last<F>> {
	return value => {
		return functions.reduce((currentValue, currentFunction) => {
			return currentFunction(currentValue)
		}, value)
	}
}

const t1 = pipe(sum, toString, toArray)('potato')
