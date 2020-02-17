

//TODO: Options, maybe { array: true, object: true, null: false } something like this

export const isValidObj = (obj): boolean =>
obj === Object(obj) && !Array.isArray(obj)

export const isObjEmpty = (obj): boolean =>
!(obj && Object.keys(obj).length)

/**
* - isObjValidAndNotEmpty checks if object is valid and not empty
* @param x object to verify
* @returns boolean
*/
export const isObjValidAndNotEmpty = (x): boolean =>
isValidObj(x) && !isObjEmpty(x)

export const validateValues = (object, options = {}): any => {
	return Object.values(object).map(val => {
		if(Array.isArray(val)) return val.length

		if(isValidObj(val)) return !isObjEmpty(val)

		if(options[val]) {
			return options[val]
		}

		return Boolean(val)
	}).every(Boolean)
}

const obj = {
	t: 1,
	b: 0,
	// tt: {},
	ttt: {
		name: 'k'
	},
	// p: [],
	contra: [1,2,3]
}

const o = validateValues(obj, { 0: true, array: true}) //  : (
