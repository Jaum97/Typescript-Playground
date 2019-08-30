//https://pt.stackoverflow.com/questions/406615/typescript-error-type-k-cannot-be-used-to-index-type-t
//thanks to user140828 for helping me type this function!

function pickProp<T extends string | number | symbol>(prop: T) {
    return function<V extends {[key in T]: any}>(obj: V) {
        return obj[prop]
    }
}

const pickName = pickProp('name')

const obj = {
	brand: '',
	age: 21
}

const t = pickName(obj)

/*
Argument of type '{ brand: string; age: number; }' is not assignable to parameter of type '{ name: any; }'.
  Property 'name' is missing in type '{ brand: string; age: number; }' but required in type '{ name: any; }'.
*/
