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

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : []

type test07 = Tail<Parameters<typeof fn00>>

type test08 = Tail<test07>

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

type params = [1,2, string]

type test09 = HasTail<params>

type test10 = HasTail<Tail<params>>

type test11 = HasTail<Tail<Tail<params>>>

type ObjectInfer<O> = O extends { a: infer A } ? A : never

const obj = { a: 'hello' }

type test12 = ObjectInfer<typeof obj>

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A,R] : never

const fn02 = (a: number, b: any) => true

type test13 = FunctionInfer<typeof fn02>

type ClassInfer<I> = I extends Promise<infer G> ? G : never

const promise00 = new Promise<number>(res => res(42))

type test14 = ClassInfer<typeof promise00>

type ArrayInfer<T> = T extends (infer U)[] ? U : never

const array00 = [0, 'data', 1, 'data']

type test15 = ArrayInfer<typeof array00>

type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A,B] : never

type test16 = TupleInfer<[string, number, boolean]>

const toCurry01 = (name: string, age: number, single: boolean) => true

const curried01 = (name: string) => (age: number) => (single:boolean) => true

// my first wonky attempt
type Curry01<F extends GenericFunction> = (arg: Head<Parameters<F>>) => 
HasTail<Parameters<F>> extends true 
  ? (arg: Tail<Parameters<F>>[0]) => 
    HasTail<Tail<Parameters<F>>> extends true
     ? (arg: Tail<Tail<Parameters<F>>>[0]) => any
      : any
      : any

type test17 = Curry01<typeof toCurry01>

type CurryV0<P extends any[], R> = (arg0: Head<P>) => HasTail<P> extends true ? CurryV0<Tail<P>,R> : R

type test18 = CurryV0<Parameters<typeof toCurry01>, ReturnType<typeof toCurry01>>

declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>

const toCurry02 = (name: string, age: number, single: boolean) => true

const curried02 = curryV0(toCurry02)

const test19 = curried02('Jane')(26)
