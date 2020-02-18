type ValidProp = string | number | symbol

type test01<T extends ValidProp> = {[key in T]: any}


type test03 = test01<'name'>

function compareProp<
  P extends ValidProp,
  O1 extends { [key in P]: any }, 
  O2 extends { [key in P]: O1[P] }>
  (prop: P): (obj1: O1) => (obj2: O2) => boolean {
  return function (obj1: O1): (obj2: O2) => boolean {
    return function (obj2: O2): boolean {
      const isO1Valid = Boolean(obj1 && obj1[prop])
      const isO2Valid = Boolean(obj2 && obj2[prop])

      return isO1Valid && isO2Valid && obj1[prop] === obj2[prop]
    }
  }
}

const obj = {
  name: 'joao'
}

const arr: Array<{
  name: string;
}> = Array(10).fill(obj).concat({ name: 'pedro' })

const obj2 = {
  name: 'pedro'
}

const found = arr.findIndex(compareProp('name')(obj2))

found

const obj3 = {id: ''}

const compareId = compareProp('id')(obj3)
