

export const pickKeys = < T,
    K extends keyof T > (obj: T, keysToPick: Array < K > ): Pick < T, K > => {
        if (Object.keys(obj).length) {
            const wantedKeys = Object.keys(obj).filter(key => keysToPick.some(
                pick => pick === key))

            const result = wantedKeys.reduce((resultObj, key) => Object.assign(
                resultObj, {
                    [key]: obj[key]
                }), ({}
                as unknown) as T)

            return result
        }
        return obj
    }

/**
 * shortPick - shortVersion of @pickProps 
 * @param x object to pick keys from
 * @param y array of keys to pick from @x
 */
type ShortPickType = <T, K extends keyof T>(x:T, y: Array<K>) => Pick<T,K>  

const shortPick: ShortPickType = (x, y) => y.reduce((a, b) => Object.assign(a, {
    [b]: x[b]
}), {} as T)

const obj = {
  name: 'dave',
  age: 21
}

const obj2 = shortPick(obj, ['job'])
//Type 'string' is not assignable to type '"name" | "age"'.ts(2322)

const obj3 = shortPick(obj, ['name'])
//const obj3: Pick<{
//   name: string;
//   age: number;
// }, "name">
