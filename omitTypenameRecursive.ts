export const omitKeys = <K extends string | number | symbol>(keys: Array<K>) => <
	O extends { [key in K]?: any }
>(
	obj: O
): Omit<O, K> => {
	if (typeof obj !== 'object' || obj === null) return obj

	const created = {} as O

	const objKeys = Object.keys(obj)

	for (const key of objKeys) {
		if (!keys.includes(key as any)) {
			;(created as any)[key] = (obj as any)[key]
		}
	}

	return created
}

export const omitTypename = omitKeys(['__typename'])

export function omitTypenameRecursive<T>(obj: T): T {
	if (typeof obj !== 'object' || obj === null) return obj

	const created = {} as any

	for (var k in obj) {
		const val = obj[k]

		if (typeof val == 'object' && val !== null && !Array.isArray(val)) {
			created[k] = omitTypenameRecursive(omitTypename(val))
		} else if (Array.isArray(val)) {
			created[k] = val.map(omitTypenameRecursive)
		} else if (k !== '__typename') {
			created[k] = val
		}
	}

	return created as T
}

const obj = {
	__typename: 'a',
	locations: [
		{
			__typename: 'a',
			coordinates: [0,0],
			radius: 0
		},
		{
			__typename: 'a',
			coordinates: [0,0],
			radius: 0
		},
	],
	a: {
		__typename: 'a',
		b: {
			__typename: 'a',
			c: {
				__typename: 'a',
				medias: [
					{
						__typename: 'a',
						coordinates: [0,0],
						radius: 0
					},
					{
						__typename: 'a',
						coordinates: [0,0],
						radius: 0
					},
				]
			}
		}
	}
}

const t00 = omitTypenameRecursive(obj).a.b.c.medias

t00
/*
[ 
	{ coordinates: [ 0, 0 ], radius: 0 }, 
  	{ coordinates: [ 0, 0 ], radius: 0 } 
] 
*/
