const obj = {
  name: 'john',
  age: 21,
  job: 'dev'
}

type PickKeys = <T, K extends keyof T>(x:T, y: Array<K>) => Pick<T,K>

const pickKeys: PickKeys = < T > (x, y) => y.reduce((a, b) => 
    Object.assign(a, {
        [b]: x[b]
    }), {} as T
)

type OmitKeys = <T, K extends keyof T>(x:T, y: Array<K>) => Omit<T,K>

const omitKeys: OmitKeys = < T > (x, y) => Object.keys(x).reduce((a, b) => 
    y.some(k => k === b) 
      ? a 
      : Object.assign(a, {
          [b]: x[b]
      }), {} as T
)

const obj2 = omitKeys(obj, ['name'])
const obj3 = pickKeys(obj, ['name'])

obj2
obj3

/**
 * ​​​​Quokka 'Untitled-2.ts'
 
{ age: 21, job: 'dev' } 
  at ​​​obj2​​​ ​quokka.ts:19:0​

{ name: 'john' } ​​​​​at ​​​obj3​​​ ​quokka.ts:20:0​
 */
