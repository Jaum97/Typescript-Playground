export function formatNestedQuery<T extends any, N extends string>(
	baseName: string,
	value: T
): any {
	if (!value || !Object.keys(value).length) return {}

	const query = {}

	for (const key in value) {
		const val = value[key]

		const isDate = isDateSearchInput(val)

		const path = `${baseName}.${key}`

		const prop = isDate ? formatDateQuery(val, key)[key as any] : val

		query[path] = prop
	}

	return query
}
