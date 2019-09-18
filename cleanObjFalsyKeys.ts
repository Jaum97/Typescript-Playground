/**
 * cleanObjFalsyKeys - takes an object returns new object with only truthly keys
 * @param obj object to clean
 * @example
 * const obj = {
		name: 'dave',
		age: undefined,
	 }
	 
	 const obj2 = cleanObjFalsyKeys(obj)

	 obj2 = { name: 'dave' }
}
 */

export const cleanObjFalsyKeys = <T>(obj: T): T => {
	const values = Object.values(obj)
	
	const newObj = Object.keys(obj).reduce((a,b,i) => {
		const shouldAssign = !!values[i]

		return shouldAssign ? Object.assign(a, { [b]: values[i] }) : a
	},{})

	return newObj as T
}
