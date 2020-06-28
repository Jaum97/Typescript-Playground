type QueryReferenceArrayObjectType<T extends any[]> =
	| { [N: string]: T }
	| { [N: string]: { $in: T } }

export function formatReferenceQuery<T extends any[], N extends string>(
	name: string,
	value: T
): QueryReferenceArrayObjectType<T> {
	if (!Array.isArray(value)) return {}

	const searchOne = { [name]: value }

	const searchMany = { [name]: { $in: value } }

	const obj = (value.length === 1
		? searchOne
		: searchMany) as QueryReferenceArrayObjectType<T>

	return obj
}
