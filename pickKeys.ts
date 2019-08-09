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
