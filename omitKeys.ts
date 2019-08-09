export const omitKeys = < T,
    K extends keyof T > (
        obj: T,
        keysToOmit: Array < K >
    ): Omit < T, K > => {
        if (Object.keys(obj).length) {
            const wantedKeys = Object.keys(obj).filter(key =>
                keysToOmit.every(omit => omit !== key)
            )

            const resultObj = wantedKeys.reduce((resultObj, key) => Object
                .assign(resultObj, {
                    [key]: obj[key]
                }), ({}
                    as unknown) as T)

            return resultObj
        }
        return obj
    }
