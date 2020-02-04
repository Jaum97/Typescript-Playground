// force prop to be of a type

type ObjectWithBooleanProp<T, K> = {
	[T[K] in String | Number]: boolean
}

function negateProperty<T, K extends keyof T, V extends ObjectWithBooleanProp<T,K>>(obj: V, prop: K): V {
	return Object.assign({}, obj, { [prop]: !obj[prop]})
}

const obj = {
	name: 'john',
	dev: false
}

// const obj: {
//     name: string;
//     dev: boolean;
// }

const obj2 = negateProperty(obj, 'dev')

obj2


function fn<T, K extends keyof T>(obj: T, prop: K): T[K] { 
	return obj[prop] 
} 

const t1 = fn(obj, 'dev')
//const t1: boolean
