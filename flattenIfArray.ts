//https://blog.graphqleditor.com/advanced-typescript-tutorial-infer/

type FlattenIfArray<T> = T extends (infer R)[] ? R : T

const arr00 = [1,2,3,4]

const arr01 = [[1],[2], [3], [4]]

const string00 = 'test'

const fn00 = <T>(x: T): FlattenIfArray<T> => {
    if(!Array.isArray(x)) return (<FlattenIfArray<T>>x)

    const isDepth1 = x.some(Array.isArray)

    return isDepth1 ? (<any>x).flat() : x[0]
}

const t00 = fn00(arr00)

const t01 = fn00(arr01)

const t02 = fn00(string00)

// 1 ​​​​​at ​​​t00​​​ ​quokka.ts:23:0​

// [ 1, 2, 3, 4 ] ​​​​​at ​​​t01​​​ ​quokka.ts:25:0​

// test


