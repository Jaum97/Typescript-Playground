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





/// NEEDS TESTING


export const passThrough = (callback: (...params: any[]) => any) => <T>(
	res: T
): T => {
	callback()
	return res
}

export const createGuardFinally = <H extends (error: IError) => any>(handler: H) => <
	F extends (...params: any[]) => any
>(
	callback: F,
	finallyCallback?: () => void
) => <P extends Parameters<F>>(
	...props: P
): ReturnType<F> | ReturnType<H> | void => {
	// need to nest try catchs to safely check whether callback is async

	let isAsync = false

	try {
		const res = callback(...props)

		isAsync = Boolean(res?.then)

		if (!isAsync) return res

		if (!finallyCallback) return res?.catch(handleError)

		return res?.catch(handleError)?.then(passThrough(finallyCallback))
	} catch (error) {
		return handler(error)
	} finally {
		if (!isAsync) {
			finallyCallback?.()
		}
	}
}
