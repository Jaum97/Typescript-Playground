function identity<T>(arg: T): T {
  return arg
}

const t: string = identity('test')

const u: number = identity(2)

interface genericFn<T> {
  (arg: T): T
}

let numberIdentity: genericFn<number> = identity

let k = numberIdentity(3)


function pluckKey<T, K extends keyof T>(arr: Array<T>, key: K) {
  return arr.map(x => x[key]) 
}

const obj = [{
  name: 'john',
  age: 21
}]

const test = pluckKey(obj, 'job')

// test Argument of type '"job"' is not assignable to parameter of type '"name" | "age"'.ts(2345)
