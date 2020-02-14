https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/

const fn00 = (name: string, age: number, single: boolean) => true

type test01 = Parameters<typeof fn00>

type GenericFunction = (...args: any[]) => any

type Params<F extends GenericFunction> = F extends ((...args: infer A) => any) 
  ? A
  : never

type test02 = Params<typeof fn00>

const obj01 = {}

type test03 = Params<typeof obj01>

// Type '{}' provides no match for the signature '(...args: any[]): any'.

const fn01 = () => true

type test04 = Params<typeof fn01>

type GenericTuple = [any, ...any[]]

type Head<T extends any[]> = T extends GenericTuple ? T[0] : never

type test05 = Head<[]>

type test06 = typeof Array.prototype.map

type Tail<T extends any


