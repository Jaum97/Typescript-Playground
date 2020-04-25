declare function createGuard<E extends Error, H extends (error: E) => any>(
	handler: H
): <F extends (...params: any[]) => any>(
	callback: F
) => <P extends Parameters<F>>(...props: P) => ReturnType<F> | ReturnType<H>

// const createGuard = (handler: <E extends Error>(error: E) => void) => <
// 	F extends (...params: any[]) => any
// >(
// 	callback: F
// ) => <P extends Parameters<F>>(...props: P): ReturnType<F> | void => {
// 	try {
// 		return callback(...props)
// 	} catch (error) {
// 		handler(error)
// 	}
// }

const createGuard = (handler) => (callback) => (...props) => {
	try {
		return callback(...props)
	} catch (error) {
		return handler(error)
	}
}

const defaultGuard = createGuard(console.log)

const callback = (props: Array<number>): string => {
	throw 'Bazinga'

	return 'succ ess'
}

const guarded = defaultGuard(callback)

const t00 = guarded([2, 2, 2])
//const t00: string | void

const t01 = createGuard((err: any): string => 'potatoes')(callback)([1,2])

//const t01: string
