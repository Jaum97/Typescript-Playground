export const updateDeep = function <T>(path: string, payload: any, obj: T): T {
	const created = JSON.parse(JSON.stringify(obj))
	const pathArr = path.split('.')
	const len = pathArr.length - 1
	let nested = created
	for (let i = 0; i <= len; i++) {
		const key = pathArr[i]
		if (i === len) {
			
			if (payload instanceof Function) {
				nested[key] = payload(nested[key])
			} else {
				nested[key] = payload
			}
		}

		if(!nested[key]) return obj

		nested = nested[key]
	}
	return created
}

const obj = {
	a: {
		b: {
			c: undefined,
			d: 2,
			e: {
				f: 'a'
			}
		}
	}
}

const t0 = updateDeep('a.b.c', 'banana', obj)

t0 // { a: { b: { d: 2, e: [Object], c: 'banana' } } } 

const t1 = updateDeep('a.b.c.e.f.g.h', 'banana', obj)

t1 // { a: { b: { c: undefined, d: 2, e: [Object] } } }  
