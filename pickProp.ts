//https://pt.stackoverflow.com/questions/406615/typescript-error-type-k-cannot-be-used-to-index-type-t
//thanks to user140828 for helping me type this function!

type validProp = string | number | symbol

type pickPropType = <T extends validProp>(prop: T) => <V extends {[key in T]: any}>(obj: V) => V[T]

/**
 * - pickProp - HOF that receives prop then returns a function 
 *  that receives obj and picks prop from object
 * @param prop property to be picked
 * @returns function that receives obj and picks prop from object
 * 
 * @param obj object from which the prop will be picked
 * @returns property prop from obj
 * 
 * @example 
 * // returns 'john'
 * pickProp('name')({name: 'john'}) 
 * 
 * @example
 * // return (obj) => obj['name']
 * pickProp('name')
 */

const pickProp: pickPropType = prop => obj => obj[prop]

const pickName = pickProp('name')

const obj = {
  value: 300,
  brand: '123',
}

const label = pickName(obj)

/**
 * Argument of type '{ value: number; brand: string; }' is not assignable to parameter of type '{ name: any; }'.
  Property 'name' is missing in type '{ value: number; brand: string; }' but required in type '{ name: any; }'.
 */
