const arr = ['1','2','3','4']

const arr2 = arr.map(parseInt)

arr2 // [ 1, NaN, NaN, NaN ]

const take = (n: number) => <F extends (...p: any[]) => any>(fn: F) => (...params: Parameters<F>) => fn(...params.slice(0, n))

const takeOne = take(1)

const arr3 = arr.map(takeOne(parseInt))

arr3 // [ 1, 2, 3, 4 ]
