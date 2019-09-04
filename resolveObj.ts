const p1 = async (x = 1) => 'resolved'
const p2 = new Promise(res => res(42))

const obj = {
	name: 'dave',
	test: p1(),
	te: '',
	potato: 123,
}

const test = Object.keys(obj).map((_,i) => i + _)

const test1 = Object.values(obj)

test1



const isPromise = (x: any): boolean => x instanceof Promise

const resolveObject = async function <T>(obj: T): Promise<T>{
	const values = await Promise.all(Object.values(obj))
	
	const res = Object.keys(obj).reduce((obj, key, i) => Object.assign(obj,{[key]: values[i]}),{}) 

	return res as T
}

const obj2 = resolveObject(obj).then(x => console.log({x}))
