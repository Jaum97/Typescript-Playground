export const omitKeys = <K extends string | number | symbol>(keys: Array<K>) => <
	O extends { [key in K]?: any }
>(
	obj: O
): Omit<O, K> => {
	const created = {} as O

	const objKeys = Object.keys(obj)

	for (const key of objKeys) {
		if (!keys.includes(key as any)) {
			; (created as any)[key] = (obj as any)[key]
		}
	}

	return created
}

const omitTypename = omitKeys(['__typename'])

function omitTypenameRecursive(obj) {
	const created = {}

	for (var k in obj) {
		const val = obj[k]

		if (typeof val == "object" && val !== null)
			created[k] = omitTypenameRecursive(omitTypename(val));
		else
			created[k] = val
	}

	return created
}


