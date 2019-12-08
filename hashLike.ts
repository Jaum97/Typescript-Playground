const list = [
  { name: 'joao', age: 11, city: 'Campinas' },
  { name: 'enrico', age: 23, city: 'Campinas' },
  { name: 'pedro', age: 41, city: 'São Paulo' },
  { name: 'joao', age: 21, city: 'Campinas' },
  { name: 'joao', age: 21, city: 'Campinas' },
]

// An index signature parameter type must be 'string' or 'number'.ts(1023)
declare type CreateHashType = <T extends Object, K extends keyof T>(arr: Array<T>, key: K) => { [key: K]: T }


declare type ValidKey = string | number | symbol

declare interface A<T, K> {
  [key: string]: T
  [key: number]: T
  //An index signature parameter type must be 'string' or 'number'.ts(1023)
  [key: symbol]: T
  // An index signature parameter type must be 'string' or 'number'.ts(1023)
  [key: K]: T
}

declare type HashLike<T extends Object, K extends keyof T & ValidKey> = A<T, K> 

const createHash = function<T extends Object, K extends keyof T>(arr: Array<T>, key: K): HashLike<T, K> {
  // Type 'K' does not satisfy the constraint '(keyof T & string) | (keyof T & number) | (keyof T & symbol)'.
  // Type 'K' is not assignable to type 'keyof T & symbol'.
  // Type 'K' is not assignable to type 'symbol'.ts(2344)
  const hash: HashLike<T, K> = {}

  const len = arr.length
  for (let i = len; i--;) {
    const aux = arr[i][key]

    if (hash[aux] === undefined) { // Type 'T[K]' cannot be used to index type 'A<T, K>'.
      hash[aux] = arr[i] // Type 'T[K]' cannot be used to index type 'A<T, K>'
    }
  }

  return hash
}

const t = createHash(lista, 'name')

// linked issue https://github.com/Microsoft/TypeScript/issues/13398
