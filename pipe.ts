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

type Pipe<F extends GenericFn[]> = (f: F) => HasTail<F> extends true 
	? Pipe<Head<Tail<F>>>
	: ReturnType<Head<F>>

const sum = (a: number,b: number): number => a + b

const toString = (a: number, b: number): string => String(a + b)

const toArray = (a: string): Array<string> => [a]

type test01 = Pipe<[typeof sum, typeof toString, typeof toArray]>

export declare function pipe(...functions) {
	return value => {
		return functions.reduce((currentValue, currentFunction) => {
			return currentFunction(currentValue)
		}, value)
	}
}
