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
	const cleanObj = {}
	for(const key in obj){
		if(obj[key]){
			cleanObj[key] = obj[key]
		}
	}
	return cleanObj
}
