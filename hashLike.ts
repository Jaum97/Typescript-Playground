const lista = [
  { nome: 'joao', idade: 11, cidade: 'Campinas' },
  { nome: 'enrico', idade: 23, cidade: 'Campinas' },
  { nome: 'pedro', idade: 41, cidade: 'São Paulo' },
  { nome: 'joao', idade: 21, cidade: 'Campinas' },
  { nome: 'joao', idade: 21, cidade: 'Campinas' },
]

declare type CreateHashType = <T extends Object, K extends keyof T>(arr: Array<T>, key: K) => { [K: string]: T }

declare type ValidKey = string | number

declare interface A<T> {
  [key: string]: T
  [key: number]: T
}

declare type HashLike<T extends Object, K extends keyof T & ValidKey> = A<T> 

const createHash = function<T extends Object, K extends keyof T>(arr: Array<T>, key: K): HashLike<T, K> {
  const hash: HashLike<T, K> = {}

  const len = arr.length
  for (let i = len; i--;) {
    const aux = arr[i][key]

    if (hash[aux] === undefined) { // Type 'T[K]' cannot be used to index type 'A<T>'.
      hash[aux] = arr[i] // Type 'T[K]' cannot be used to index type 'A<T>'.
    }
  }

  return hash
}

const t = createHash(lista, 'nome')

// linked issue https://github.com/Microsoft/TypeScript/issues/13398
