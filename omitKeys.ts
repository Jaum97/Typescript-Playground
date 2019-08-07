export const omitKeys = <T, K extends keyof T>(
	obj: T,
	keysToOmit: Array<K>
): Pick<T, Exclude<keyof T, K>> => {
	if (Object.keys(obj).length) {
		const wantedKeys = Object.keys(obj).filter(key =>
			keysToOmit.every(omit => omit !== key)
		)

		const wantedObj = wantedKeys.map(key => [key, obj[key]])

		const result = wantedObj.reduce(
			(resultObject, keyValuePair) => {
				resultObject[keyValuePair[0]] = keyValuePair[1]

				return resultObject
			},
			({} as unknown) as T
		)

		return result
	}
	return obj
}
