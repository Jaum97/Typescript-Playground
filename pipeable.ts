import { F } from 'ts-toolbelt'

/**
 * Pipe receives any number of functions and returns a
 * function that will receive a value and pass this value through
 * all the functions
 * @param fns functions to pipe
 * @example 
 * const add2 = (x) => x + 2

	const double = (x) => x * 2

	const res = pipe(add2, double)(2) // 8

	const res2 = pipe(double, add2)(2) // 6
 */
export const pipe = function<Fns extends Array<F.Function>>(
	...fns: Fns
): F.Piped<Fns> {
	return function(value) {
		return fns.reduce(
			(currentVal, currentFn) => currentFn(currentVal),
			value
		)
	}
}

export const pipeableArrayMethod = (method: any) => <C extends F.Function>(
	callback: C
) => <T>(arr: Array<T>): Array<T> => method.call(arr, callback)

export const pipeableMap = pipeableArrayMethod(Array.prototype.map)

export const pipeableFilter = pipeableArrayMethod(Array.prototype.filter)
