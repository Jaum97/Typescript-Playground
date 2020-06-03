const arr1 = [1, 2, 3]
const arr2 = ['1', '2', '3']

const fn = <T>(x: T): Array<T> => [x, x]

const fn2 = <T>(x: Array<T>): { key: T; value: T } => ({
	key: x[0],
	value: x[1]
})

type MapLike = Array<Record<number, number>>

const arr3 = arr1.map(fn)

// const map1: Map<number, number> = new Map(arr3)  BREAKS :/

const map1: Map<number, number> = new Map([[1,1],[2,2],[3,3]])

console.time('t')

const val1 = map1.get(1)

console.timeEnd('t')
